# Replication
(comments from adz)

- Which protocol is used for replication?

In server to server communication each instance prioritizes `system logs` over `user logs` and will only request `user logs` of schemes it knows about.

A protocol could look like this:

1. Server A asks Server B *"Hey, I know about these `95 users` on my instance, here are all of them including their sequence numbers and log ids! And I'm interested in `comment`, `post`, `like` and `message` schemas! How about yours?"*
2. Server B checks the `95 users` against its `104` ones. It also has the same installed schemas, except of that it also has `party` and `icecream` schemas, but it will ignore them for now. It realizes that `17` users of the sent users Server B doesn't know about yet, also it sees that Server A lacks `20` users and has another `45` users which have new content (a higher sequence number) in a few logs!
3. Server B sends a list of the `20 + 45 = 65` users back to A where a) doesnt have the user at all or b) has a lower sequence number. *"I think you don't have these yet!"*
4. Server A asks Server B *Thank you! Can you send me all the bamboo entries of these `65 users` from these logs? Let's start with log id 0-1023 for every user and then move on with the log ids of the schemas im interested in ..*


### Merge Conflicts

> Won't we have a conflict if users register the same schema at two servers and it gets assigned to different log ids?

Yes, thats correct!

So far I can come up with the following possible merge conflicts / log forks (given all is signed by the same keypair):

* Same schema gets assigned to different log ids
* Bamboo entry with same sequence number and log id but different payload

In an p2p append-only-log setting there is no way I can think of right now which will be 100% conflict free. Possible solutions and half-solutions could be:

1. Get rid of append-only-logs aka Bamboo and consider insert-only-sets ala @AljoschaMeyer (see https://github.com/AljoschaMeyer/set-reconciliation even though this is more about replication than the data structure itself)
2. Have a more formal way of "marrying" the server to the client. The server *knows* what client officially registered to it and the other way around. This can be achieved with storing the clients public address in a table on the server and have somekind of registration process ala invite codes, auth token or a simple "hello, this is my home now" and "goodbye, im going somewhere else". Through this we know that our log stored on the db is the "right one" and can at least warn the user (via UI) if we detect incoming diverging data (fork detection) from another server signed by the same key and a) ignore that data or b) ask the user which fork is the right one (conflict resolution).

Surely it would still be theoretically possible to marry a client to two or more servers .. and still we can't prevent this to happen, but we can build UX patterns around it which make it harder by a) thinking about a good migration process to move my logs to a new home server b) adding the home server url into the data export so you have the same when restoring your client etc. c) informing the user enough that certain actions are dangerous.

In SSB a fork occurs when you post with two clients on the same machine at the same time or post on multiple machines with the same keypair, as far as I can tell there is no real conflict resolution taking place (?!), other users just stop seeing your posts. In beep-beep this problem shifts to the servers.
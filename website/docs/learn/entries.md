---
title: Entries
---

import ImageFrame from '@site/src/components/ImageFrame';

## Trust is funny

Oh, we’ve just got this postcard from a Penguin:

<ImageFrame
  title="A postcard from Mr. Penguin"
  url={require('./assets/postcard-from-mr-penguin.png').default}
/>

The Penguin-Postcard-Protocol (PPP) of Shirokuma-Town is a p2p protocol without computers: Every Penguin can send any postcard to any other Penguin through some delivery service which has multiple stations across the town.

The Penguins in Shirokuma-Town are very happy with PPP, even though it has many flaws. For example: When we know Mr. Penguin, we probably will follow the invitation, but how can we be _really_ sure this postcard was actually sent by Mr. Penguin? And how can we be sure that nobody changed that postcard before it arrived in our inbox? Maybe someone from the delivery service changed its message or even the address?

Probably we will not send anything important in a postcard because we can not _really trust_ the Penguin-Postcard-Protocol. Maybe Mr. Penguin will use Zoognal to send a more important message next time?

On the internet we usually trust some sort of platform or the underlying protocol and hope it will_ secure_ our messages. This assures us that the data comes from that person and it didn’t get changed by someone else after it got sent. Most of the time we speak about **Authentication** in this regard: Who is the _authentic_ person behind that data?

We learned some Authentication patterns from the last years and rely on them a lot: For example we confirm our email addresses or mobile phone numbers and have some kind of password to get access to our accounts.

:::tip Icebears philosophical corner

Is that secure? Do email addresses prove enough who we are? We _do_ put a lot of trust in the computers, programs and platforms we’re using. But that’s also true for everything else around us! This discussion can get very deep and philosophical and not even the most radical “trust less” p2p protocol can give us a definite answer.

We can already see that trust is a funny thing. But enough for now, let’s think about _some_ solutions we can give to provide authentication in a decentralised system and we will see that they are at least more secure than postcards!

:::

## Bamboo

To secure and authenticate _any_ data, we’re using a special data type named **Bamboo** which helps us with these problems.

:::info Infotainment intermission

The name is no coincidence! Pandas love bamboo! The Bamboo data type was designed (also) with p2panda in mind. Read about it’s specification [here](https://github.com/AljoschaMeyer/bamboo).

:::

The main data type of Bamboo is an **Entry** which can point at any sort of data, for example the postcard of Mr. Penguin. We can think about it as a _seal_ we put on the postcard to indicate that it a) came from a certain person b) it wasn’t opened and potentially changed before it arrived in our inbox.

<ImageFrame
  title="Entry 'sealing' any data"
  url={require('./assets/sealing-any-data.png').default}
/>

Let’s look a little bit closer into how Bamboo Entries help us here. From now on we will call any data the **Payload**, just to slowly move towards the terminology used in the official Bamboo specification.

:::note Privacy vs. security

What about _privacy_? Anyone can read our postcards when we send them around! Bamboo Entries do provide authentication and security, but not  privacy. For this p2panda has something else: Secret Groups!

:::

### Does the Entry really point at this particular Payload?

Whenever we create a new Entry we generate a **Hash** of the data it is pointing at. This Hash we store inside the Entry as the `payload_hash`. Whenever we receive the Entry and the Payload we re-create the Hash of it _again_ and compare it with the `payload_hash` which is given by the original Entry. If they diverge we can be sure the data got changed by someone and we can’t trust it anymore!

:::tip What is hashing?

Hashing is a way to convert (large) data into a shorter representation. For example the letter of Penguin can be expressed as this (BLAKE3) hash: `6c35954716cb993c153e55b25650d87119ceacd0646d2de5450b14dd97897b82`. This allows us to refer to it without sending the whole original data again. We can not re-create the original data from a Hash, this information will be gone, but we will always be able to recreate it and arrive at the same Hash value as soon as we have the original data.

:::

<ImageFrame
  title="Comparing hash and size"
  url={require('./assets/comparing-hash-and-size.png').default}
/>

:::info Hash specification

We need to specify _how_ we hash something so we can recreate and validate hashes at any point. p2panda uses the [BLAKE3](https://github.com/BLAKE3-team/BLAKE3) hashing algorithm and wraps it around the [YASMF](https://github.com/AljoschaMeyer/yamf-hash) format to allow future changes where we might want to change the hashing algorithm without breaking anything from before.

:::

Next to the `payload_hash` an Entry also holds the size of the Payload in a field called `payload_size`. If the Payload would be `21` bytes large it would be mentioned there. With this we can check now if a) the Payload size is still the same b) know how large the data is even before we looked at it ourselves.

### What if the Entry got changed?

We can verify now if the Payload itself got changed by comparing the `payload_hash` and `payload_size` - but what if the Entry itself got manipulated? To solve this, every Entry contains a **Signature**! It needs to be generated after the Entry values got set.

<ImageFrame
  title="Signing an entry with a private key"
  url={require('./assets/signing-an-entry-with-a-private-key.png').default}
/>

To sign an Entry we need some sort of **Digital Signature Algorithm** which always comes with a **Public-** and **Private Key**.

:::tip Down the cryptography rabbit hole

Where do we get these keys from? We can simply generate them ourselves without any central authority!

To make sure we can create a key pair without anyone else accidentially creating the same we use cryptographically secure pseudorandom number generators (CSPRNG). These generators are usually given by every computer and help us with finding a very large, random number which very likely will not occur a second time in the world ever.

A Digital Signature Algorithm defines how these random numbers are used to derive a Private Key and then a Public Key from it.

:::

The private part is a secret information only the author of this Entry knows about. With the Signature Algorithm we take the Entry and the Private Key as inputs and generate the Signature itself. Finally we store it in the `signature` field of the Entry.

:::info Anologies never work

An (somewhat) analogy to public key cryptography would be IRL signatures we write with a pen on paper: A person signs a document to show that they “approved” this version of it - but also to authenticate themselves. Ideally only the person knows how to write that signature and nobody else will be able to fake it. This is where the analogy falls a little bit apart: In public key cryptography faking the private key is much harder or almost impossible.

:::

Now we get two guarantees: a) if the Entry data got changed after signing it, the Signature is not valid anymore b) with signing the data we also shown now that we are the owner of that Private Key! A Signature Algorithm assures us that nobody else could have generated that particular signature without knowing the Private Key secret.

:::info DSA specification

Similar to defining the Hashing Algorithm in Bamboo, we also need to define the Digital Signature Algorithm (DSA). p2panda uses [Ed25519](https://ed25519.cr.yp.to/).

:::

Whenever we receive an Entry and Payload now from somewhere, we can check if the Signature really fits the given Entry. If we can not verify the Signature we can’t trust that the Entry didn’t get changed.

### How do we know the Signature really belongs to the Author?

We can verify now if the Payload and Entry didn’t get changed and really belong together, but how do we know that the Signature belongs to that Author?

Besides the `signature` the Entry has needs to provide an `author` field which contains the _Public Key_ part of the original author. In contrast to the Private Key the public part is not a secret and can be shared with others.

When we verify the Signature of the Entry we take the Public Key, the part of the Entry which was used during signing and the Signature itself to check if they all belong together.

<ImageFrame
  title="Verifying the Signature of an Entry"
  url={require('./assets/verify-signature-of-entry.png').default}
/>

We now have everything to securely authenticate an Entry and it’s Payload. As we can see, this is already better than the Penguin-Postcard-Protocol!

With all of this together the Entry contains: `author`, `signature`, `payload_hash` and `payload_size` - and there is even more coming!

## Time

Mr. Penguin’s postcard has a date printed on it: The delivery service of the postcards stamps it on every card as soon as they receive it.

But again, can we trust the delivery service to not just stamp an arbitrary date on the card? Was it really the `10.08.2022` this postcard was seen first?

:::tip Icebears philosophical beard

Time on computers is funny (or time in general). How does the computer know what time it is? Usually it got told at one point where it should start counting and from that point on some small quartz crystal is just ticking the time further, hopefully not getting too much out of sync with the clocks of other devices. The computer even has a small battery for that quartz crystal so it can keep on ticking when it is turned off. Computers with internet usually sync themselves regularly to some sort of central time service, to prevent the delay getting too horrible.

When it gets really important we _want_ to know the date of something, for example when signing a contract digitally! There is a a lot of research in [Secure Time-stamping](https://en.wikipedia.org/wiki/Trusted_timestamping) which addresses this problem with computers.

Interestingly the Bamboo specification was inspired by a thesis on Secure Time-stamping, read it [here](https://www.researchgate.net/publication/216824681_Secure_and_Efficient_Time-Stamping_Systems).

:::

We could add a field to Entry to provide a date, similar to the postcard, but first of all, the computer might not even know the right time and even worse, do we trust the claimed date on an Entry from someone else?

:::note Computers are still governed by social constructs

It is also okay to use timestamps in p2p protocols if we really want them. Sometimes we might just want to use computers together with our friends or we don’t care if someone lied to us. Bamboo and p2panda does not provide that functionality but it would be easy to add on top.

:::

Bamboo Entries can not solve the problem of _absolute_ time for us as it is simply _not possible_ to do this in a decentralised system, but we can introduce something like a _relative_ time, we can at least proof that an Entry got created _after_ another.

When a new Entry gets created we can point at the previous Entry by calculating the Hash of it and mentioning it in the new Entry. This **Backlink Hash** is stored as the `backlink`. Through this we form some sort of _linked list_ or _chain_ of entries. The first Entry does not contain a `backlink`.

<ImageFrame
  title="Entries chained by backlinks"
  url={require('./assets/entries-chained-by-backlinks.png').default}
/>

Since we are not able to generate hashes without knowing the original data, we can proof that we’ve seen the previous Entry when we created the new one.

:::info A hash is a hash is a hash

Again, similar to `payload_hash`, that `backlink` was generated with BLAKE3 using the YASMF container format.

:::

As soon as we receive an Entry we can recalculate the hashes and verify that the `backlink` is actually correct. If we receive many entries we have to do this for all of them by _walking_ the Backlink path from last to first Entry. With this we can proof the _causal order_ or _relative time_ of the entries and that they all belong together.

## Logs

With Backlinks we come really close to the true nature of Bamboo: It is an **Append-Only Log**! The chained list of entries is also called a **Log** in Bamboo, while the append-only nature stems from the fact that we’re inserting always new entries at the end of it.

:::info 🎍

Like logs of bamboo plants growing out of the ground.  🎍 🎍 🎍

:::

Bamboo allows us to create multiple logs per Author, we just need to give it a unique **Log Id** which is a number starting at `0`. Through this we can identify which Entries belongs to which Log as they keep it as the `log_id`. Together with the Backlinks we can make sure that they also really stay inside the claimed Log.

<ImageFrame
  title="Multiple logs"
  url={require('./assets/multiple-logs.png').default}
/>

To check that everything fits together we verify for each incoming Entry that the `author` and `log_id` is the same across the whole Log. Every Log can only be maintained by one single Author. This is also the reason why we call Bamboo a _Single Writer_ Append-Only Log.

:::note Single Writer vs. Multi Writer

Now you might think that p2panda can only be used by one Person, but this is not the case! p2panda supports collaborative _Multi-Writer_ settings across Authors and Logs but this is handled outside of Bamboo. Read the [Operations](/learn/operations) section to find out more.

:::

Why do we want to have multiple Logs? It can have different reasons, depending on the protocol we want to design. For example we could have a dedicated Log for postcards from Ms. Penko and another one for boring postcards from the tax authority. Whenever the time comes, we can eventually even delete whole logs without removing all the other, unrelated entries. If we would mix up different sorts of messages within the same log it would be harder to delete it.

## Deletion

With the ever-growing nature of Append-Only Logs we might end up with extremely long lists of Entries which comes with two problems: a) we want to safe some space on our hard-disk b) we don’t want to always look at _all_ Backlinks just to verify the integrity of _all_ Entries. This takes too much time!

With Backlinks this is tricky, as removing Entries would mean that we tamper with the integrity of the hashes. Holes in a log can easily be detected and will break the chain, we would need to consider such Bamboo data invalid.

<ImageFrame
  title="Trying to delete an Entry"
  url={require('./assets/trying-to-delete-an-entry.png').default}
/>

We could try to just remove the beginning of a Log instead, this will only break the Backlink for the first Entry which we could say is fine, but how can we now tell that someone didn’t hide some information from us by not sending the whole Log? Before we could at least detect the Entry without a `backlink` to find out if we reached the beginning of the Log. If we would remove that information, we’re lost. In this case we would also need to consider such data invalid.

<ImageFrame
  title="Trying to delete beginning of a Log"
  url={require('./assets/trying-to-delete-beginning-of-log.png').default}
/>

Bamboo solves this problem with a second kind of Hash which is called a **Skiplink**. It allows us to verify the full integrity of the Log even after we’ve deleted some Entries of it.

Skiplinks are formed slightly different than Backlinks: Instead of_ always_ pointing at the previous Entry they _sometimes_ point at Entries which are more far away in the past. Based on these rules not every Entry needs to contain a Skiplink: For example in a Log with 8 Entries inside only the 4th and 8th Entry would contain a Skiplink.

Skiplinks form an alternative path through the log which is much faster to follow than if we would go through all Backlinks. Also it allows us to delete all Entries which are not on that path.

:::info Example

This means that we can not delete _everything_ if we still want to proof the integrity of the data. We need to keep at least the Entries on the Skiplink path. For example: If we have 8 Entries in a Log, we would need to keep at least 2 of them. If we have 40 Entries we only need 4 and so on. The number of required Entries grows only logarithmic.

:::

<ImageFrame
  title="Log with Skiplinks and deleted Entries"
  url={require('./assets/log-with-skiplinks-and-deleted-entries.png').default}
/>

Another feature of Bamboo is that we can not only delete the Entries but also every Payload, as this data is separated from the Log. This is why we can call Payloads also _Off-Chain Data_: Maybe our Log contains Entries pointing at many large images we want to delete after a while. It would be possible to delete these images, free up some space - while the Log integrity stays intact.

:::tip Math magic

Read about the math behind Skiplinks in the [Bamboo specification](https://github.com/AljoschaMeyer/bamboo#links-and-entry-verification) if you are interested in how it works.

If you’re interested in the deeper theory of Binary Linking Schemes, you can also read this great [summary](https://aljoscha-meyer.de/linkingschemes).

:::

Removing Entries or Payloads is not only interesting for freeing up space on our hard-disk but also useful when sending Bamboo Data from one computer to another. The data might still exist on our machine but the other party is not interested in receiving everything. Still the receiver will be able to verify the full integrity of the data. This procedure is called **Sparse Replication**.

:::note Coming up next

While we have loads of ideas and draft concepts around _Sparse Replication_ we haven’t implemented it yet in p2panda. Write us if you are interested in this topic!

:::

## Forks

What happens if we created a log where two Entries contain the same `backlink`? It would mean that our Log gets split into two branches. This is what we call a **Fork**.

<ImageFrame
  title="Forked log"
  url={require('./assets/forked-log.png').default}
/>

To detect forks, Bamboo introduces the concept of **Sequence Numbers**. Every Entry in the Log gets an unique number, starting at `1` and growing by `1` with each new Entry. We store it in an Entry as the `seq_num`.

This strictly enforced numbering system requires that every Entry is exactly only one step away from the previous one, we can not suddenly jump from Sequence Number `2` to `9` for example.

With the help of Sequence Numbers we can detect now forks more easily. We can do this by either detecting: a) duplicate Sequence Numbers b) too large jumps between the Entries Sequence Numbers.

<ImageFrame
  title="Invalid forked logs"
  url={require('./assets/invalid-forked-log.png').default}
/>

:::tip Is it a fork or not?

This does not fully prevent us from accidental or malicious forks, we can still imagine scenarios where we will not be able to detect them, for example by hiding the data about the second branch from another person: The fork exists, but they will never see it!

:::

## Tags

We covered it all now. Bamboo entries give us a lot more than postcards: Authentication, Security, Causal Ordering, Deletion, Sparse Replication and Fork Detection!

Now we talked about almost all fields a Bamboo entry contains: `author`, `signature`, `seq_num`, `log_id`, `payload_hash`, `payload_size`, `backlink` and `skiplink`.

There is one more field we haven’t mentioned yet which is the `tag` field. It can be used to indicate if a Bamboo Log ended. The **Tag** is `0` most of the time, unless when it is indicating the end of the log it is `1`. Authors are not able to create any new Entries to that Log if the Tag is `1`.

:::info Upgrade path

This can be used to update Bamboo in the future for example. You can read about this in the [specification](https://github.com/AljoschaMeyer/bamboo#encoding). Since it doesn’t touch upon any p2panda functionality (yet) we did not feature it here.

:::

## Encoding

Since Bamboo Entries are meant to be used with computers rather than Penguins we need to also specify _how_ a computer should represent them as bytes. We do this by defining an **Encoding**.

:::tip What is an Encoding?

An Encoding defines how a computer should interpret sequences of bytes to be able to read and write data of some shape. If we come across the following bits: `0110 0011 1010 1001` we would now need some sort of definition to be able to interpret this? Does this encode a number? An emoji? Or something else?

:::

In the previous sections we already defined that we use Ed25519 for the Digital Signature Algorithm (`author` and `signature`) and BLAKE3 hashes wrapped in the YASMF container format (`payload_hash`, `skiplink`, `backlink`), these are not only definitions of algorithms but also concrete encodings of fixed length!

How do we encode `log_id` and `seq_num`? These are numbers and for them Bamboo uses the [VarU64](https://github.com/AljoschaMeyer/varu64) encoding.

Now we have everything we need to now except of the order of the data, which is:

- `tag`, either a zero byte (`0x00`) to indicate a regular log entry, or a one byte (`0x01`)  to indicate an end-of-log marker
- `author`, the 32 bytes that make up the ed25519 public key of the log's author
- `log_id`, the 64 bit integer that serves to distinguish different logs by the same author, encoded as VarU64
- `seq_num`, the sequence number of the entry, encoded as VarU64
- `skiplink`, the hash of an older log entry, encoded as yasmf-hash
- `backlink`, the hash of the previous log entry, encoded as yasmf-hash
- `payload_size`, the size of the payload, encoded as VarU64
- `payload_hash`, the hash of the payload, encoded as yasmf-hash
- `signature`, the signature obtained from signing the data with the author's private key (64 bytes)

Let’s look at this binary data here, this _is_ an Entry! This data is what every computer writes or reads when working with Bamboo:

```
10011100110110110011101010001100000011000100101100110000100000010111001111010100110000111100010000111010011001111010011011010000000100110100010001001010111110011001101011001011100010111110011011000101001001000010001101110100011011011001101010100010110000010000000100000001101111000000000000100000011101011001011110101010011010000000101001111111011000011001110101110010111011000100010000010000101110110011101000001010111101001011110010110110011001010000100111100100001111000001110111011110110001110000101111101110111111010100101100010101100011110101110000011010000010000011011010010111010110101000101000100011110110010010111001111111111100111101001000110111010000101101111110110100101001011100010001000111101100101110111101111011100001101111110100010000011000110111010000111011101001101011101101010000111000001101110111001110111111110111110100111000000101001000001001011010101011110011010111001111000111010010001010001000000001100001111111001111111111110000000000110111010110111001000111011100111111000011100011111001010001011010011110011000110100011000000100001010
```

It is a little bit too hard to read, so we convert the binary numbers to hexadecimal ones:

```
009cdb3a8c0c4b308173d4c3c43a67a6d013444af99acb8be6c52423746d9aa2c10101bc00207597aa680a7f619d72ec4410bb3a0af4bcb66509e43c1ddec70beefd4b158f5c1a0836975a8a23d92e7ff3d23742dfb4a5c447b2ef7b86fd1063743ba6bb50e0ddceff7d3814825aaf35cf1d2288061fcfff00375b91dcfc38f945a798d1810a
```

:::tip Number systems

Most of the time we are surrounded by decimal numbers like `114` but we can also represent them in different systems, for example binary (`1110010`) or hexadecimal (`72`), the latter is used a lot by humans to save some space when looking at data, computers are already very happy with the binary representation.

:::

This is still hard to read but knowing the Bamboo encoding and the length of all items we should be able to take this apart:

```yaml
# Tag
00

# Author (ed25519 public key)
9cdb3a8c0c4b308173d4c3c43a67a6d013444af99acb8be6c52423746d9aa2c1

# Log id
01 

# Sequence number (it is the first entry in the log!)
01

# Skiplink and Backlink omitted as it is the first Entry!

# Payload size (188 bytes apparently)
bc

# Payload hash
00207597aa680a7f619d72ec4410bb3a0af4bcb66509e43c1ddec70beefd4b158f5c 

# Signature
1a0836975a8a23d92e7ff3d23742dfb4a5c447b2ef7b86fd1063743ba6bb50e0ddceff7d3814825aaf35cf1d2288061fcfff00375b91dcfc38f945a798d1810a
```

## Next up

The Payload of Entries are **Operations** in p2panda. Operations give more features on top of Bamboo, for example _Multi-Writer_ updates for collaboration on the same data across Logs and Authors,_Encryption_ and _Conflict Resistant Data Types_ (CRDTs). Read more about them next.

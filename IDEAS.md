# Ideas

These use cases describe how we imagine p2panda to be used. This does not preclude other use cases – on the contrary, our design decisions should allow for flexibility and hackability.

- Let users see a festival schedule and create events for it
- Let users schedule usage of many resources owned by a collective / organization
- Let users setup a bot that creates random meetings between other users with random assigned resources
- p2panda is strictly speaking just a definition of data schemas which can be distributed and interpreted by any kind of client which follows this definition. However, the use, interface and purpose on how p2panda is used is not further defined, which gives some freedom in what a client actually could be. Examples:
  - A festival tool which displays a calendar and gives the user the possibility to create own events, manage and share resources with others (this is the BLATT 3000 use-case).
  - A simple widget one can display on a page / dashboard / projector to show the next events.
  - A client which holds many resources owned by a collective / organization, it could be used as a more "professional" tool to overview where items are right now and where they are being used. Also one could think of a special procedure to authorize the use of items (for example by majority vote).
  - An independent piece of software which does not require a user interface as it acts upon p2panda autonomously. It could scrape other platforms / protocols (Twitter feeds, RSS feeds, Facebook events) and remix them, or it could be an AI bot curating the festival, actually enacting upon a real infrastructure of places, people and resources.
  - An archiving client which gathers the data it gets and re-configures / displays / exports it in some other feed in some way for documentation / presentation. It could be connected to Dat and IPFS to automatically store the data there.
  - A client which organizes random meetings between users and assigns resources to these meeting events (random meeting bot).
- Since a resource is just defined by an arbitrary title, description and image, it can be anything. Examples and possible use-cases could be:
  - A festival token you only get authorized to use when you checked in at an official festival deck. Other users will see if an event has this festival token and can "trust" this event as it got "officially" confirmed. Obviously, this is a more traditional use-case of p2panda.
  - Money can be a resource (for example in 1, 10 or 100 Euro quantities) which can be requested by anyone to realize their events. A special client holding these resources could have an authorization mechanism which distributes the funds accordingly.
  - Any URL, virtual address is a resource, so events can take place in shared documents, live streams, chats etc. Also external programs can be addressed this way, for example Dat / IPFS / SSB hashes.
  - A 3D position could be a resource, which could be used for events taking place in virtual spaces, like a computer game / VR world or any other 3D environment. One could think of a sound installation where users place sound sources and 3D objects on a X/Y/Z axis.
- p2panda can be used to "hijack" other festivals. Groups can enter other festivals and register their infrastructure / events etc. to enact p2panda upon it.
- Have sub-curators during a defined (festival) time-frame. Do a "call for festivals" or a "call for collectives", curating independently but interdependently their festival logic within p2panda. They can be based on competently different clients / plugins / aesthetics / ideas / philosophies, take place in different parts of the world, but still be parse-able by others as long as they follow the p2panda data structure. Another idea is to have a "call for AIs" and ask for teams who want to contribute bot curators.
- Have virtual spaces the festival can take place in, like a 3D world / game. Users can create events in X/Y/Z positions in this 3D space.

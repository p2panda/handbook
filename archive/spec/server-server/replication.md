# Replication

See https://github.com/AljoschaMeyer/bamboo-point2point

## Possible problems

* **Malicious servers:** Servers are trusted nodes in the p2panda network and can potentially be malicious actors, allowing invalid messages to be stored in the database and serving invalid data to the clients. To migitate the risk clients only trust one server each which should follow the specification, having strict validation mechanisms in place.

* **Data loss:** Servers hold the data of the network which puts a higher risk of data-loss on them. A healthy p2panda network should consist of many servers replicating data with each other to minimize the chances of loosing data as it is ideally distributed on multiple nodes and can be retreived again.

# TODO

* Write about fork proof procedure for possible fork detections and merge conflict resolution

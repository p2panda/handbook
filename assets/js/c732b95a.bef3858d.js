"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[9595],{4137:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},d=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),h=u(a),m=o,g=h["".concat(s,".").concat(m)]||h[m]||p[m]||i;return a?n.createElement(g,r(r({ref:t},d),{},{components:a})):n.createElement(g,r({ref:t},d))}));function m(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=a.length,r=new Array(i);r[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var u=2;u<i;u++)r[u]=a[u];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},1799:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var n=a(7462),o=(a(7294),a(4137));const i={title:"Tutorial: Set up a local node"},r=void 0,l={unversionedId:"tutorials/aquadoggo",id:"tutorials/aquadoggo",title:"Tutorial: Set up a local node",description:"This tutorial walks you through setting up a locally running p2panda node on your computer and shows you how you can configure it and interact with it via the GraphQL playground.",source:"@site/docs/tutorials/aquadoggo.md",sourceDirName:"tutorials",slug:"/tutorials/aquadoggo",permalink:"/handbook/tutorials/aquadoggo",draft:!1,tags:[],version:"current",frontMatter:{title:"Tutorial: Set up a local node"}},s={},u=[{value:"What do I need?",id:"what-do-i-need",level:2},{value:"Download <code>aquadoggo</code>",id:"download-aquadoggo",level:2},{value:"Start the node",id:"start-the-node",level:2},{value:"See more logs",id:"see-more-logs",level:3},{value:"GraphQL playground",id:"graphql-playground",level:2},{value:"Send a query",id:"send-a-query",level:3},{value:"Documentation",id:"documentation",level:3},{value:"Configuration",id:"configuration",level:2},{value:"Data directory",id:"data-directory",level:3},{value:"Delete database",id:"delete-database",level:3},{value:"HTTP port",id:"http-port",level:3},{value:"PostgreSQL or SQLite",id:"postgresql-or-sqlite",level:3},{value:"Done!",id:"done",level:2}],d={toc:u};function p(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This tutorial walks you through setting up a locally running p2panda node on your computer and shows you how you can configure it and interact with it via the GraphQL playground."),(0,o.kt)("p",null,"Its good to know how to run your own node if you want to start developing p2panda clients. You can try out new schemas and applications with them or just experiment!"),(0,o.kt)("p",null,"We will use the reference node implementation ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/p2panda/aquadoggo"},(0,o.kt)("inlineCode",{parentName:"a"},"aquadoggo"))," for this, which is a command line application written in Rust."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("mdxAdmonitionTitle",{parentName:"admonition"},"What is a ",(0,o.kt)("em",{parentName:"mdxAdmonitionTitle"},"node"),"?"),(0,o.kt)("p",{parentName:"admonition"},"Nodes are the actual participants in an p2panda network: They validate and store data coming from clients and make sure to send it to other nodes."),(0,o.kt)("p",{parentName:"admonition"},"Nodes are usually agnostic to the applications using them, this means that one node could potentially support hundreds of different p2panda applications. Having one node running on your computer is therefore already enough! You can read more about nodes in the regarding ",(0,o.kt)("a",{parentName:"p",href:"/learn/networks"},"Learn")," section.")),(0,o.kt)("h2",{id:"what-do-i-need"},"What do I need?"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Rust"),(0,o.kt)("li",{parentName:"ul"},"Terminal"),(0,o.kt)("li",{parentName:"ul"},"Browser")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"How do I install Rust?"),(0,o.kt)("p",null,"Make sure you have have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running ",(0,o.kt)("inlineCode",{parentName:"p"},"rustc --version")," in your terminal. This tutorial was written with Rust version ",(0,o.kt)("inlineCode",{parentName:"p"},"1.63.0")," but it will probably also work with other versions."),(0,o.kt)("p",null,"If you don't have Rust installed yet you can follow the steps on the official Rust website: ",(0,o.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/tools/install"},"How to install Rust"),"."),(0,o.kt)("admonition",{title:"Never worked with Rust before?",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"This tutorial requires you to have a working Rust environment. If you have never worked with Rust before this is no problem! Setting it up is fairly easy and besides of using some basic command line commands there is no more Rust knowledge required to make the node run on your computer."))),(0,o.kt)("h2",{id:"download-aquadoggo"},"Download ",(0,o.kt)("inlineCode",{parentName:"h2"},"aquadoggo")),(0,o.kt)("p",null,"Let's download ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo"),"! For this we first download the whole git repository with the source code inside:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Download git repository\ngit clone git@github.com:p2panda/aquadoggo.git\n\n# Enter the folder you've just created\ncd aquadoggo\n")),(0,o.kt)("h2",{id:"start-the-node"},"Start the node"),(0,o.kt)("p",null,"To run the node now you only have to run this command inside the project's folder:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cargo run\n")),(0,o.kt)("p",null,"This will automatically download all required Rust dependencies, compile the application and finally start it. Probably you will see a lot of logs now around what the Rust compiler is doing. Depending on your computer and network connection this might take a couple of minutes. The good thing though is, that you only have to do this once, the next time you run the command, it will start the program directly."),(0,o.kt)("p",null,"When the compilation finished and the program started you will see .. almost nothing!"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    Finished dev [unoptimized + debuginfo] target(s) in 0.10s\n     Running `target/debug/aquadoggo`\n")),(0,o.kt)("p",null,"This is because by default the program will not spit out any information except when you explicitly asked about it. "),(0,o.kt)("p",null,"The node is already running, you are done!"),(0,o.kt)("h3",{id:"see-more-logs"},"See more logs"),(0,o.kt)("p",null,"We can quit the node by pressing ",(0,o.kt)("inlineCode",{parentName:"p"},"CTRL")," + ",(0,o.kt)("inlineCode",{parentName:"p"},"C")," in the regarding terminal. Let's start it again, but this time with more logging enabled:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"RUST_LOG=aquadoggo=info cargo run\n")),(0,o.kt)("p",null,"This will enable logs coming directly from ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," and only the most important ones, like basic system informations, warnings and errors. We are enabling logging with the environment variable ",(0,o.kt)("inlineCode",{parentName:"p"},"RUST_LOG"),"."),(0,o.kt)("p",null,"Ah, this looks more interesting now:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    Finished dev [unoptimized + debuginfo] target(s) in 0.10s\n     Running `target/debug/aquadoggo`\n[2022-09-05T15:59:14Z INFO  aquadoggo::manager] Start materializer service\n[2022-09-05T15:59:14Z INFO  aquadoggo::materializer::worker] Register reduce worker with pool size 16\n[2022-09-05T15:59:14Z INFO  aquadoggo::materializer::worker] Register dependency worker with pool size 16\n[2022-09-05T15:59:14Z INFO  aquadoggo::materializer::worker] Register schema worker with pool size 16\n[2022-09-05T15:59:14Z INFO  aquadoggo::manager] Start replication service\n[2022-09-05T15:59:14Z INFO  aquadoggo::manager] Start http service\n[2022-09-05T15:59:14Z INFO  aquadoggo::graphql::schema] Subscribing GraphQL manager to schema provider\n")),(0,o.kt)("p",null,"If you want to see even more you can change the log verbosity from ",(0,o.kt)("inlineCode",{parentName:"p"},"info")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"debug")," or even ",(0,o.kt)("inlineCode",{parentName:"p"},"trace"),", but then you will see a whole flood of information you might not always need."),(0,o.kt)("admonition",{title:"Even more logging",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"If you're curious to see ",(0,o.kt)("em",{parentName:"p"},"even")," more then you can enable logging for ",(0,o.kt)("em",{parentName:"p"},"everything")," (that is, even logs from dependencies) via: ",(0,o.kt)("inlineCode",{parentName:"p"},"RUST_LOG=debug cargo run"),".")),(0,o.kt)("h2",{id:"graphql-playground"},"GraphQL playground"),(0,o.kt)("p",null,"How can we actually check that the node is running? When starting ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," it will automatically open an HTTP server on port ",(0,o.kt)("inlineCode",{parentName:"p"},"2020")," with an GraphQL API. On top of that it offers a playground for us to already play with the GraphQL API. We can visit it by opening our browser and going to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"http://localhost:2020/graphql\n")),(0,o.kt)("h3",{id:"send-a-query"},"Send a query"),(0,o.kt)("p",null,"Maybe you have never worked with ",(0,o.kt)("a",{parentName:"p",href:"https://graphql.org/"},"GraphQL")," before but we can just send some queries to the node for fun. You can enter a query in the left area of the playground and click the large ",(0,o.kt)("em",{parentName:"p"},"Play")," button in the middle. This will send the query to the node and it's JSON response will show in the right area."),(0,o.kt)("p",null,"Try this following query by entering it in the left textarea and clicking the ",(0,o.kt)("em",{parentName:"p"},"Play")," button:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},"{\n  all_schema_definition_v1 {\n    fields {\n      name\n      description\n    }\n  }\n}\n")),(0,o.kt)("p",null,"It will return the following, relative unspectacular response in the right area:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "data": {\n    "all_schema_definition_v1": []\n  }\n}\n')),(0,o.kt)("p",null,"Still, this is already doing a lot! With this query we asked our ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," if it knows any schemas and since we have just started it it doesn't know any yet! This is why the response is empty .. it's soon time to teach the ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," some tricks but this is part of the next ",(0,o.kt)("a",{parentName:"p",href:"/tutorials/send-to-node"},"how to create a schema tutorial"),". For now we get to know the doggo a little bit better."),(0,o.kt)("h3",{id:"documentation"},"Documentation"),(0,o.kt)("p",null,"You can see, this is already how we can interact with the node at any time, we can simply just write queries in the playground using our browser! When building a p2panda client you do nothing else: The client sends GraphQL queries to the node and handles the JSON responses! If you're curious now on how to build a client you can check out this ",(0,o.kt)("a",{parentName:"p",href:"/tutorials/mushroom-app"},"how to build a client tutorial"),"."),(0,o.kt)("p",null,"There are a couple of more queries you can find when you click on the ",(0,o.kt)("em",{parentName:"p"},"Docs")," tab in the right sidebar. Next to the ",(0,o.kt)("inlineCode",{parentName:"p"},"all_schema_definition_v1")," query you find others, for example ",(0,o.kt)("inlineCode",{parentName:"p"},"all_schema_field_definition_v1")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"entryByHash")," etc. Later you will find more queries here you created yourself by introducing new schemas to the node!"),(0,o.kt)("admonition",{title:"What are all these queries?",type:"note"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"entriesNewerThanSeqNum"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"entryByLogIdAndSeqNum")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"entryByHash")," are currently all required to ",(0,o.kt)("a",{parentName:"p",href:"/specification/APIs/replication"},"replicate"),' data from one node to another ("Replication API"), these will mostly be used by other nodes. The other queries serve to find out which schemas exist, they will be used by ',(0,o.kt)("a",{parentName:"p",href:"https://p2panda.org/handbook/specification/APIs/queries"},"clients"),' ("Client API"). Surely there will be more queries coming in the future.')),(0,o.kt)("h2",{id:"configuration"},"Configuration"),(0,o.kt)("p",null,"Now we learned how to start a node and how to interact with it via GraphQL! Let's see now how we can configure and adjust it to our special needs. This is mainly a collection of ",(0,o.kt)("em",{parentName:"p"},"cool tricks")," and not a full documentation of ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo"),", also you probably might not need all of this in the beginning, but maybe it comes in handy soon!"),(0,o.kt)("h3",{id:"data-directory"},"Data directory"),(0,o.kt)("p",null,"Whenever we start a new node it will create a directory on your computer where it stores the database inside. On Linux this directory is by default under ",(0,o.kt)("inlineCode",{parentName:"p"},"~/.local/share/aquadoggo")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"/Users/<username>/Library/Application Support/aquadoggo")," on MacOS systems."),(0,o.kt)("p",null,"We can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"--data-dir")," command line argument to change the path of this folder to something else. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cargo run -- --data-dir ~/good-doggo\n")),(0,o.kt)("p",null,"This can be useful if you want to temporarily experiment with a fresh, new ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," installation without deleting your previous database."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("mdxAdmonitionTitle",{parentName:"admonition"},"What are these strange ",(0,o.kt)("inlineCode",{parentName:"mdxAdmonitionTitle"},"--"),"?"),(0,o.kt)("p",{parentName:"admonition"},"You might wonder why we have these ",(0,o.kt)("inlineCode",{parentName:"p"},"--")," two dashes right before we set the argument. This is required to tell ",(0,o.kt)("inlineCode",{parentName:"p"},"cargo")," that we're ",(0,o.kt)("em",{parentName:"p"},"not")," setting an argument for it but for ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo"),". You can try removing them, ",(0,o.kt)("inlineCode",{parentName:"p"},"cargo")," will tell you that it doesn't know what to do with ",(0,o.kt)("inlineCode",{parentName:"p"},"--data-dir"),".")),(0,o.kt)("h3",{id:"delete-database"},"Delete database"),(0,o.kt)("p",null,"Especially during development you might want to delete your database, you can do this by simply removing the data directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Remove database on Linux\nrm -rf ~/.local/share/aquadoggo\n\n# Remove database on Mac OS\nrm -rf ~/Library/Application Support/aquadoggo\n")),(0,o.kt)("p",null,"Make sure that ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," is not running anymore before you delete that folder."),(0,o.kt)("admonition",{title:"Watch out!",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"This is ",(0,o.kt)("em",{parentName:"p"},"really")," deleting everything you stored in your node.")),(0,o.kt)("h3",{id:"http-port"},"HTTP port"),(0,o.kt)("p",null,"By default ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," starts an HTTP server on port ",(0,o.kt)("inlineCode",{parentName:"p"},"2020"),". If you want to change this you can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"HTTP_PORT")," environment variable like that:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# This changes the GraphQL endpoint to http://localhost:4040/graphql\nHTTP_PORT=4040 cargo run\n")),(0,o.kt)("p",null,"This is useful if for whatever reason your port ",(0,o.kt)("inlineCode",{parentName:"p"},"2020")," is already occupied or if you want to run ",(0,o.kt)("em",{parentName:"p"},"more than one")," aquadoggo."),(0,o.kt)("h3",{id:"postgresql-or-sqlite"},"PostgreSQL or SQLite"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," allows you to use an SQLite ",(0,o.kt)("em",{parentName:"p"},"or")," PostgreSQL database. SQLite is the default and really amazing as it does not require you to set up an actual database software. This is why it is so easy to just start an ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo"),". It is also very useful for embedding ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," for example ",(0,o.kt)("em",{parentName:"p"},"inside"),' of an application where you don\'t want the users to also take care of the database, all should just work "out of the box".'),(0,o.kt)("p",null,"Sometimes you want to use PostgreSQL though, maybe because you are planning to host your ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," on a server where it will be used by hundreds of users at the same time. For this of course you need a ",(0,o.kt)("a",{parentName:"p",href:"https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04"},"running PostgreSQL database"),"."),(0,o.kt)("p",null,"Just add the ",(0,o.kt)("inlineCode",{parentName:"p"},"DATABASE_URL")," environment variable in front of the ",(0,o.kt)("inlineCode",{parentName:"p"},"cargo run")," command to set the new URL for the database:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Use an external PostgreSQL database\nDATABASE_URL=postgresql://postgres:postgres@localhost:5432/aquadoggo cargo run\n")),(0,o.kt)("admonition",{title:"Explore SQLite",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"By default ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," will always use ",(0,o.kt)("a",{parentName:"p",href:"https://www.sqlite.org/index.html"},"SQLite"),", if you have an ",(0,o.kt)("inlineCode",{parentName:"p"},"sqlite3")," client installed you can explore the database like that:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Explore the SQLite database (on Linux)\nsqlite3 ~/.local/share/aquadoggo/aquadoggo-node.sqlite3\n"))),(0,o.kt)("admonition",{title:"Run SQLite in-memory",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Another cool SQLite feature is that you can just store the database ",(0,o.kt)("em",{parentName:"p"},"in memory"),", this means that it will be gone after you quit ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo"),". This is also very useful if you really just want to try something out without storing the data somewhere longer."),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"DATABASE_URL=sqlite::memory: cargo run\n"))),(0,o.kt)("admonition",{title:"Migrations",type:"info"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," checks if there are any pending SQL migrations on every start up. If it detects missing migrations it will run it automatically against the given database.")),(0,o.kt)("h2",{id:"done"},"Done!"),(0,o.kt)("p",null,"Super, you know now how to start an aquadoggo on your computer or server! This is the first step towards running a p2panda application on your computer or building a new one. Check out the ",(0,o.kt)("a",{parentName:"p",href:"/tutorials/send-to-node"},"next tutorial")," on how to send data to your running node."),(0,o.kt)("admonition",{title:"Extra: Embed a node",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"This is not part of this tutorial but we just want to mention that you can ",(0,o.kt)("em",{parentName:"p"},"also")," run a node programmatically by embedding it directly in your Rust codebase:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"use aquadoggo::{Configuration, Node};\nlet config = Configuration::default();\nlet node = Node::start(config).await;\n")),(0,o.kt)("p",{parentName:"admonition"},"This is very similar to using the command line application, just that you can ship your applications now with a node running ",(0,o.kt)("em",{parentName:"p"},"inside"),"! Users will then automatically start the node whenever they start the application. Together with ",(0,o.kt)("a",{parentName:"p",href:"https://tauri.studio"},"Tauri")," your applications can even be written in JavaScript and still use ",(0,o.kt)("inlineCode",{parentName:"p"},"aquadoggo")," internally - even when you're not a Rust developer!")))}p.isMDXComponent=!0}}]);
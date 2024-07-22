  query NextArgs($publicKey: String!, $viewId: String) {
    nextArgs(publicKey: $publicKey, viewId: $viewId) {
      logId
      seqNum
      backlink
      skiplink
    }
  }
`,vg=Dg`
  mutation Publish($entry: String!, $operation: String!) {
    publish(entry: $entry, operation: $operation) {
      logId
      seqNum
      backlink
      skiplink
    }
  }
`;async function zg(A,B,Q,g,I,C){const E=await async function(A,B,Q){return(await A.request(Xg,{publicKey:B,viewId:Q})).nextArgs}(A,B.publicKey(),g),D=function(A){mg({operation:A},{operation:{type:"object"}});const{action:B="create",schemaId:Q,fields:g}=A;let I,C;if("string"==typeof A.previous?I=A.previous.split("_"):"object"==typeof A.previous&&(I=A.previous),mg({action:B,schemaId:Q},{action:{type:"string"},schemaId:{type:"string"}}),!["create","update","delete"].includes(B))throw new Error(`Unknown operation action "${B}"`);void 0!==g&&(C=g instanceof jg?g.__internal:new jg(g).__internal);try{return fg.encodeOperation(BigInt(Vg[B]),Q,I,C)}catch(E){throw new Error(`Could not encode operation: ${E.message}`)}}({action:"update",previous:g,schemaId:Q,fields:{[`game_field_${I}`]:C}}),w=function(A,B){mg({entry:A,keyPair:B},{entry:{type:"object"},keyPair:{type:"object"}});const{skiplink:Q,backlink:g,operation:I}=A,C=ug(A.logId,BigInt(0)),E=ug(A.seqNum,BigInt(1));mg({logId:C,seqNum:E,skiplink:Q,backlink:g,operation:I},{logId:{type:"bigint",min:0},seqNum:{type:"bigint",min:1},skiplink:{length:68,optional:!0,validHex:!0},backlink:{length:68,optional:!0,validHex:!0},operation:{validHex:!0}});try{return fg.signAndEncodeEntry(C,E,Q,g,I,B.__internal)}catch(D){throw new Error(`Could not sign and encode entry: ${D.message}`)}}({...E,operation:D},B);return await async function(A,B,Q){return(await A.request(vg,{entry:B,operation:Q})).publish}(A,w,D),mg({value:i=w},{value:{validHex:!0}}),fg.generateHash(i);var i}const _g="privateKey",$g="lastMove";const AI=({config:A})=>{const B=(0,g.useMemo)((()=>function(){const A=window.localStorage.getItem(_g);if(A)return new bg(A);const B=new bg;return window.localStorage.setItem(_g,B.privateKey()),B}()),[]),Q=(0,g.useMemo)((()=>function(A){const B=parseInt(A.slice(0,8),16);return wg[B%wg.length]}(B.publicKey())),[B]),I=(0,g.useMemo)((()=>new Qg(A.endpoint)),[A.endpoint]),[C,E]=(0,g.useState)(),[D,w]=(0,g.useState)(),[i,o]=(0,g.useState)(),[G,N]=(0,g.useState)((()=>window.localStorage.getItem($g))),[M,F]=(0,g.useState)(),[k,a]=(0,g.useState)(!0),c=(0,g.useMemo)((()=>function(A,B){let Q=[];for(let g=0;g<A;g+=1)for(let I=0;I<A;I+=1)Q=Q.concat([...og(g,I,A,B),...Gg(g,I,A,B),...Ng(g,I,A,B),...Mg(g,I,A,B)]);return Q}(A.boardSize,A.winSize)),[A.boardSize,A.winSize]),s=(0,g.useMemo)((()=>i?function(A,B){const Q=[],g=A.reduce(((A,B,Q)=>ig(B)?(B in A||(A[B]=[]),A[B].push(Q),A):A),{}),I=Object.keys(g);for(let C=0;C<I.length;C+=1)for(let A=0;A<B.length;A+=1){const E=I[C],D=g[E],w=B[A];!w.some((A=>!D.includes(A)))&&Q.push({player:E,combination:w})}return Q}(i,c):[]),[i,c]),h=(0,g.useCallback)((async()=>{const B=await async function(A,B,Q,g){const I=new Array(g*g).fill(0).map(((A,B)=>`game_field_${B+1}`)),C=Dg`
    query FetchBoard($documentId: String!) {
      board: ${B}(id: $documentId) {
        meta {
          viewId
        }
        fields {
          ${I.join(" ")}
        }
      }
    }
  `,E=await A.request(C,{documentId:Q});return{viewId:E.board.meta.viewId,fields:I.map((A=>E.board.fields[A]))}}(I,A.schemaId,A.documentId,A.boardSize);M!==B.viewId&&(w(B.viewId),o(B.fields),F(B.viewId),a(!0))}),[I,A.boardSize,A.documentId,A.schemaId,M]),R=(0,g.useCallback)((async g=>{if(!D||!k||G===D)return void E("Wait until another player made a move first");a(!1),o((A=>{if(A)return A[g-1]=Q,[...A]}));const C=await zg(I,B,A.schemaId,D,g,Q);N(C),function(A){window.localStorage.setItem($g,A)}(C)}),[D,I,G,B,A,Q,k]);return(0,g.useEffect)((()=>{const B=window.setInterval((()=>{h()}),A.updateIntervalMs);return h(),()=>{window.clearInterval(B)}}),[I,h,A.updateIntervalMs]),g.createElement(g.Fragment,null,i&&g.createElement(QI,null,g.createElement(BI,null,C&&g.createElement(DI,{message:C,onClose:()=>{E("")}}),g.createElement(gI,{onSetField:R,animal:Q,fields:i,winners:s})),Q&&g.createElement(NI,{animal:Q,winSize:A.winSize})))},BI=pB.div`
  display: inline-block;
  position: relative;
`,QI=pB.div`
  text-align: center;
`,gI=({onSetField:A,animal:B,fields:Q,winners:I})=>g.createElement(II,{$boardSize:Math.sqrt(Q.length)},Q.map(((Q,C)=>{const E=C+1,D=Q===B,w=I.some((({player:A,combination:B})=>Q===A&&B.includes(C)));return g.createElement(CI,{onClick:()=>{D||A(E)},$alreadySet:D,$winner:w,key:`field-${E}`},ig(Q)&&Q)}))),II=pB.div`
  display: inline-grid;
  font-size: ${28}px;
  gap: ${17}px;
  grid-auto-rows: ${60}px;
  grid-template-columns: ${A=>`repeat(${A.$boardSize}, 60px)`};
`,CI=pB.div`
  align-content: center;
  background-color: ${A=>A.$winner?"#ffdb9a":"#efefef"};
  border-radius: 50%;
  cursor: ${A=>A.$alreadySet?"normal":"pointer"};
  display: inline-grid;
  text-align: center;
  transition: background-color linear 20ms;
  user-select: none;

  ${A=>{if(!A.$alreadySet)return`\n      &:hover {\n        background-color: ${A.$winner?"#ffc04d":"#ddd"};\n      }\n    `}}
`,EI=({children:A})=>{const[B,Q]=(0,g.useState)(!1);return(0,g.useEffect)((()=>{(async()=>{await async function(){await Zg(Wg()),rg()}(),Q(!0)})()}),[]),B?A:null},DI=({message:A,onClose:B})=>g.createElement(wI,null,g.createElement(iI,null,g.createElement(oI,null,A),g.createElement(GI,{onClick:B},"Okay"))),wI=pB.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`,iI=pB.div`
  align-items: center;
  background-color: #8ac18a;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 75px 25px;
  padding: 10px;
`,oI=pB.p`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
`,GI=pB.button`
  background-color: #a68ac1;
  border-radius: 15px;
  border: 0;
  color: #f2eef6;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 10px;
  outline: 0;
  padding: 10px;

  &:hover {
    background-color: #b199c9;
  }
`,NI=({animal:A,winSize:B})=>g.createElement(MI,null,"Put ",B,"x ",A," in a row to win"),MI=pB.div`
  font-size: 15px;
  margin: 20px;
  text-align: center;
`,FI={boardSize:4,winSize:3,documentId:"00206e635f39093c4a78942cfb9ee07dc148daac373efd9882e2b651a39153eea75d",endpoint:"https://welle.liebechaos.org/graphql",schemaId:"zoo_adventures_0020d0ab014720c6849d99ab17f694bcedbc267614021acfb9559f2ee7f64bce396f",updateIntervalMs:2e3},kI=A=>{const B={...FI,...A};if(B.boardSize<3)throw new Error("boardSize can not be smaller than 2");if(B.winSize<2)throw new Error("winSize can not be smaller than 1");if(B.boardSize<B.winSize)throw new Error("winSize can not be larger than boardSize");return g.createElement(EI,null,g.createElement(AI,{config:B}))}}}]);
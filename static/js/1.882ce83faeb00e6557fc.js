webpackJsonp([1],{"/pqJ":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("oFuF"),i=s("IcnI"),a=s("7+uW"),n=s("qoVm"),r=i.a.state.contractPath,l=s("q+Vb")("./deployments."+r+".json"),c=s("tBpT"),p={data:function(){return{txs:{},pixelContract:null,voteContract:null,mynfts:[],joinVoteNft:null,joinVoteVisible:!1,nftCards:[],selectTopic:"",proposal:{},loadings:{}}},beforeMount:function(){var t=[];for(var e in c.nfts){var s=c.nfts[e];105!=s.id&&t.push({name:s.name.zh,value:s.id})}this.nftCards=t},mounted:function(){this.initContract()},computed:{web3:function(){return this.$store.state.web3}},watch:{web3:function(t,e){this.initContract()}},methods:{initContract:function(){if(this.web3&&this.web3.web3Instance&&!this.pixelContract){var t=this.web3.web3Instance();this.pixelAddress=l.Pixel.address,this.pixelContract=new t.eth.Contract(l.Pixel.abi,l.Pixel.address,{from:this.web3.coinbase}),this.voteAddress=l.PixelVote.address,this.voteContract=new t.eth.Contract(l.PixelVote.abi,l.PixelVote.address,{from:this.web3.coinbase}),this.getInfo()}},getInfo:function(){this.getCurProposal(),this.getMyWorks()},getMyWorks:function(){this.checkStateAlive("pixelWorks")},toLastPage:function(){this.$router.push({name:"pixelMasterScene"})},getMyPixelWorks:function(){var t=this;this.pixelContract.methods.balanceOf(this.web3.coinbase).call({from:this.$store.state.contractFrom}).then(function(e){t.myNftBalance=e,console.log("myNftBalance balanceOf",e),0!=e&&t.pixelContract.methods.tokensOf(t.web3.coinbase,0,e).call({from:t.$store.state.contractFrom}).then(function(e){var s=[];console.log("tokensOf",e),e.length>0&&t.pixelContract.methods.getPixelInfos(e).call({from:t.$store.state.contractFrom}).then(function(e){console.log("token infos:",e),e.forEach(function(t){var e={id:t[0],name:t[1],url:t[2],mintdate:t[3]};s.push(e)}),t.mynfts=s,t.$store.commit("setPixelWorks",s),console.log(t.$store.state.pixelWorks)})})})},getCurProposal:function(){var t=this;this.voteContract.methods.proposalID().call({from:this.$store.state.contractFrom}).then(function(e){t.proposalId=e,0!=e&&t.voteContract.methods.proposals(e).call({from:t.$store.state.contractFrom}).then(function(e){var s=parseInt(new Date/1e3),i=0,a=0;e.signupTime>s?(a=0,i=e.signupTime-s):e.signupTime<s&&e.voteTime>s?(a=1,i=e.voteTime-s):e.voteTime<s&&e.endTime>s?(a=2,i=e.endTime-s):a=3,e.status=a,e.remainTime=i,e.remainTimeStr=o.a.countdownHour(i),t.proposal=e})})},toUTF8Array:function(t){for(var e=[],s=0;s<t.length;s++){var o=t.charCodeAt(s);o<128?e.push(o):o<2048?e.push(192|o>>6,128|63&o):o<55296||o>=57344?e.push(224|o>>12,128|o>>6&63,128|63&o):(s++,o=65536+((1023&o)<<10|1023&t.charCodeAt(s)),e.push(240|o>>18,128|o>>12&63,128|o>>6&63,128|63&o))}return e},utf8to16:function(t){var e,s,o,i,a,n;for(e="",o=t.length,s=0;s<o;)switch((i=t.charCodeAt(s++))>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:e+=t.charAt(s-1);break;case 12:case 13:a=t.charCodeAt(s++),e+=String.fromCharCode((31&i)<<6|63&a);break;case 14:a=t.charCodeAt(s++),n=t.charCodeAt(s++),e+=String.fromCharCode((15&i)<<12|(63&a)<<6|(63&n)<<0)}return e},toWall:function(t){var e=this.joinVoteNft.id,s=this.selectTopic;if(0!=s){console.log(s);var i=this.voteAddress,r=this;a.default.set(r.loadings,"publish"+e,!0);var l=this.proposalId,c="0x";for(l=o.a.toBigInteger(l).toString(16);l.length<64;)l="0"+l;for(c+=l,s=o.a.toBigInteger(s).toString(16);s.length<64;)s="0"+s;c+=s,console.log(c),this.pixelContract.methods.safeTransferFrom(this.web3.coinbase,i,e,c).estimateGas({from:this.web3.coinbase},function(t,s){if(t){console.log(t,s);var l=o.a.errMsg(t);return r.$message({message:n.a.t("pixel.publishfailed")+l,type:"warning",center:!0}),void a.default.set(r.loadings,"publish"+e,!1)}r.pixelContract.methods.safeTransferFrom(r.web3.coinbase,i,e,c).send({gasPrice:r.web3.gasPrice,gas:s}).on("transactionHash",function(t){console.log(t),r.joinVoteVisible=!1,r.$message({message:n.a.t("pixel.publishconfirm"),type:"info",center:!0})}).on("receipt",function(t){console.log(t),r.txs[t.transactionHash]||(r.txs[t.transactionHash]=t.transactionHash,a.default.set(r.loadings,"publish"+e,!1),r.getInfo(),r.$message({message:n.a.t("pixel.publishsuccess"),type:"success",center:!0}))}).on("confirmation",function(t,e){console.log(t)}).on("error",function(t){console.log(t),a.default.set(r.loadings,"publish"+e,!1);var s=t&&t.message?t.message:"";r.$message({message:n.a.t("pixel.publishfailed")+s,type:"error",center:!0})})})}else this.$message({message:n.a.t("pixel.noinputTopic"),type:"warning",center:!0})},showWorksJoin:function(t){this.joinVoteVisible=!0,this.joinVoteNft=t},checkStateAlive:function(t){this.$store.state[t]?this.mynfts=this.$store.state[t]:this.getMyPixelWorks()}},beforeDestroy:function(){},filters:{}},u={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"pixel-container"},[o("div",{staticClass:"valid-container"},[o("div",{staticClass:"my-works"},[o("div",{staticClass:"part-title"},[o("div",{staticClass:"img-box",on:{click:function(e){return t.toLastPage()}}},[o("img",{attrs:{src:s("kKUE"),alt:""}})]),t._v(" "),o("div",{staticClass:"left-border"}),t._v(" "),o("div",{staticClass:"center-text"},[t._v(t._s(t.$t("pixel.myworks")))])]),t._v(" "),o("div",{staticClass:"works-list"},[t._l(t.mynfts,function(e,s){return o("div",{key:s,staticClass:"work-item"},[o("div",{staticClass:"item-img",style:{backgroundImage:"url("+e.url+")"}}),t._v(" "),o("div",{staticClass:"item-info"},[o("span",[t._v(t._s(e.name))])]),t._v(" "),o("div",{staticClass:"item-btn"},[o("el-button",{staticClass:"gradient size",attrs:{round:"",loading:!1},on:{click:function(s){return t.showWorksJoin(e)}}},[t._v(t._s(t.$t("pixel.joinvote")))])],1)])}),t._v(" "),o("div",{staticClass:"work-item",staticStyle:{content:"''",height:"0"}})],2),t._v(" "),o("div",{staticClass:"bottom-tips"},[t._v(t._s(t.$t("pixel.gocreate")))])])]),t._v(" "),t.joinVoteNft?o("el-dialog",{attrs:{title:t.$t("pixel.publish"),visible:t.joinVoteVisible,center:"","modal-append-to-body":!1},on:{"update:visible":function(e){t.joinVoteVisible=e}}},[o("div",{staticClass:"join-box"},[o("div",{staticClass:"tips"},[o("span",{staticClass:"vote-title"},[t._v(t._s(t.proposal.name))])]),t._v(" "),o("div",{staticClass:"tips"},[0==t.proposal.status?o("span",[t._v(t._s(t.$t("pixel.beforeact"))+t._s(t.proposal.remainTimeStr))]):t._e(),t._v(" "),1==t.proposal.status?o("span",[t._v(t._s(t.$t("pixel.inact"))+t._s(t.proposal.remainTimeStr))]):t._e(),t._v(" "),2==t.proposal.status?o("span",[t._v(t._s(t.$t("pixel.beforevote"))+t._s(t.proposal.remainTimeStr))]):t._e(),t._v(" "),3==t.proposal.status?o("span",[t._v(t._s(t.$t("pixel.afteract")))]):t._e()]),t._v(" "),o("div",{staticClass:"topic-select"},[o("div",{staticClass:"label"},[t._v(t._s(t.$t("pixel.relatetopic")))]),t._v(" "),o("div",{staticClass:"input"},[o("el-select",{attrs:{placeholder:t.$t("pixel.selecttopic")},model:{value:t.selectTopic,callback:function(e){t.selectTopic=e},expression:"selectTopic"}},t._l(t.nftCards,function(t){return o("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})}),1)],1)]),t._v(" "),o("el-button",{staticClass:"gradient size",attrs:{round:"",loading:t.loadings["publish"+t.joinVoteNft.id]},on:{click:function(e){return t.toWall()}}},[t._v(t._s(t.$t("common.confirm")))]),t._v(" "),o("p",{staticStyle:{color:"#da56a6","margin-top":"10px"}},[t._v(t._s(t.$t("activity.artdesc1")))]),t._v(" "),o("p",{staticStyle:{color:"#da56a6"}},[t._v(t._s(t.$t("activity.artdesc2")))]),t._v(" "),o("div",{staticClass:"close-btn"},[o("div",{staticClass:"icon",on:{click:function(e){t.joinVoteVisible=!1}}},[o("img",{attrs:{src:s("ScAH"),alt:"close"}})])])],1)]):t._e()],1)},staticRenderFns:[]};var A=s("VU/8")(p,u,!1,function(t){s("b2rp")},"data-v-4def2dac",null);e.default=A.exports},b2rp:function(t,e){},kKUE:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAACL3+lcAAACpUlEQVRoBe2YPWgUQRTH37vdxMSvQu1t1MIPxEpFRWyCd4KYPRfEQiFgaSXYqWgpWlkKCooBWbwNgkZECYpFGtsTQixtBC0kEM1l9/leSGBub10QZmZF3jQ784adff/f7P5nZgG0KAEloASUgBJQAkpACSgBJaAElIASUAJK4H8jgHUKiuN4uLeQ3QHAi0jwEUbXn0vTx19d5tRwOXjV2Cx2y/JC9hoILgPRZgI6QT8Xr1TdY6MvtDHI344Rn453sNgXRLCrcG9QaFtvep/h8ZPx0eWlbLYoFhHmcGT0tnWFhQG9Co5a0XnC7A0BbDXzYLHvwo3BYdffrzzTm+CoefZansMT/mbXFcQ+YrFjSZJ8N+Ou6s5dWpyYv9f7/ApfKIpAxBvp9LNbxbjLtlPBq07cYbHH+0Qg/GogTHRedib74h4azgSvOHFv0In5gd8AgjPpq+SDB30Dj3AiWJwYIJsqMae5cCg4lTxP5gcy8RSwvu61W+2DOeQznP8mU8OqE48lafLFjPuuW3fpjGCibieugmhdMBJb1D9crAtuNPAhsAubmmVJkn2zuLYZr6Pu3bQIhlpT008/1yFWnml9hmVQWXLC4eCQ7I+lvVZ4pvmw0JuNmtGRtZjvqxPBIkKWHtkfizv3iSLYlgO8lX11X9xTw/qyZObd7XYX9x3YO0k92s7x/UZfyLPd3r1zT/5pvvveiDuvOvmGy7Ieb7avs4HfLPbxGyCHh0t8eFgq9rloexMsyctrnBM8KFmn5XgY+TgxeRUsoqu2nTCy4ZjrM7Ez0xJxZaXKwfmf1tWye2zGvAuW5P/o4HzisCmubKxaBK+I5j8c8qeDd2X3APEHAs7wP627ZUlqTAkoASWgBJSAElACSkAJKAEloASUgBJQAkqgisBvECvUGdzrBf8AAAAASUVORK5CYII="}});
//# sourceMappingURL=1.882ce83faeb00e6557fc.js.map
(this["webpackJsonpissuetracker-app"]=this["webpackJsonpissuetracker-app"]||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),i=a(7),l=a.n(i),c=a(8),r=a(1),o=a(2),u=a(5),m=a(4),d=a(3),g=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(r.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={severity:null,assigned:"",status:"",desc:"",low:!1,med:!1,high:!1},e.handleChange=function(t){e.setState({desc:t.target.value})},e.handleChange2=function(t){e.setState({assigned:t.target.value})},e.handleClickH=function(t){e.setState({severity:t.target.value,high:!0,med:!1,low:!1})},e.handleClickM=function(t){e.setState({severity:t.target.value,med:!0,high:!1,low:!1})},e.handleClickL=function(t){e.setState({severity:t.target.value,low:!0,high:!1,med:!1})},e.handleSubmit=function(t){t.preventDefault();var a={ts:(new Date).toLocaleTimeString(),desc:e.state.desc,assigned:e.state.assigned,severity:e.state.severity,id:Object(d.uuid)().slice(0,6),status:"Open"};e.props.handleSubmit(a),e.setState({severity:null,assigned:"",status:"",desc:"",low:!1,med:!1,high:!1})},e}return Object(o.a)(a,[{key:"render",value:function(){return this.props.show?n.a.createElement("div",{className:"jumbotron"},n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("div",{className:"input-group mb-3"},n.a.createElement("div",{className:"input-group-prepend"},n.a.createElement("span",{className:"input-group-text"},"Description")),n.a.createElement("input",{type:"text",placeholder:"Describe the issue",className:"form-control",name:"desc",onChange:this.handleChange,value:this.state.desc})),n.a.createElement("div",{className:"input-group mb-3"},n.a.createElement("label",{className:"input-group-text"},"Severity"),n.a.createElement("input",{type:"button",className:this.state.high?"btn btn-danger ml-3":"btn btn-outline-danger ml-3",onClick:this.handleClickH,value:"High"}),n.a.createElement("input",{type:"button",className:this.state.med?"btn btn-warning ml-3":"btn btn-outline-warning ml-3",onClick:this.handleClickM,value:"Medium"}),n.a.createElement("input",{type:"button",className:this.state.low?"btn btn-info ml-3":"btn btn-outline-info ml-3",onClick:this.handleClickL,value:"Low"})),n.a.createElement("div",{className:"input-group mb-3"},n.a.createElement("div",{className:"input-group-prepend"},n.a.createElement("span",{className:"input-group-text"},"Assigned to")),n.a.createElement("input",{type:"text",className:"form-control",name:"assigned",onChange:this.handleChange2,value:this.state.assigned})),n.a.createElement("input",{type:"submit",value:"Submit",className:"btn btn-danger",onClick:this.handleSubmit}),n.a.createElement("button",{className:"btn btn-outline-success ml-3",onClick:this.props.handleToggle},"Close"))):null}}]),a}(s.Component),h=(a(14),function(e){var t=e.issues,a=e.getBackground;return n.a.createElement("div",{className:"grid"},n.a.createElement("div",{className:"row bg-light"},n.a.createElement("div",{className:"col "},"Status"),n.a.createElement("div",{className:"col"},"Id"),n.a.createElement("div",{className:"col-4"},"Description"),n.a.createElement("div",{className:"col-2"},"Severity"),n.a.createElement("div",{className:"col-2"},"Created"),n.a.createElement("div",{className:"col"},"Assigned"),n.a.createElement("div",{className:"col"},"Due")),t.map((function(e){return n.a.createElement("div",{key:Object(d.uuid)(),className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("div",{className:"status"},n.a.createElement("div",{onClick:function(){return console.log("clicked")},className:a(e.status)},e.status))),n.a.createElement("div",{className:"col"},e.id),n.a.createElement("div",{className:"col-4"},e.desc),n.a.createElement("div",{className:"col-2"},n.a.createElement("div",{className:"status"},n.a.createElement("div",{className:a(e.severity)},e.severity))),n.a.createElement("div",{className:"col-2"},e.ts),n.a.createElement("div",{className:"col"},e.assigned),n.a.createElement("div",{className:"col"},e.due))})))}),p=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(r.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={issues:[{id:"uuidv4",severity:"High",assigned:"name",status:"Closed",desc:"News API only works in development mode.",due:"Yesterday",ts:"Last week "},{id:"f55e72",severity:"High",assigned:"name",status:"Open",desc:"Lorem ipsum dolor sit amet.",due:"Never",ts:"timestamp "},{id:"39b0af",severity:"Low",assigned:"name",status:"Fixed",desc:"Consectetur adipisicing elit.",due:"Not Set",ts:"10:13:00 AM "},{id:"61447c",severity:"Low",assigned:"name",status:"Fixed",desc:"Facilis impedit quo nobis soluta obcaecati.",due:"Not Set",ts:"8:53:00 AM "},{id:"d1630e",severity:"Medium",assigned:"name",status:"Closed",desc:"Magni exercitationem error.",due:"Not Set",ts:"12:52:59 PM "}],isOpen:!1},e.handleToggle=function(){e.setState({isOpen:!e.state.isOpen})},e.handleSubmit=function(t){e.setState({issues:[].concat(Object(c.a)(e.state.issues),[t])})},e.getBackground=function(e){return"High"===e?"bg-danger":"Medium"===e?"bg-warning":"Low"===e?"bg-info":"Fixed"===e?"bg-success":"Open"===e?"bg-primary":"Closed"===e?"bg-secondary":void 0},e}return Object(o.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"container"},n.a.createElement("h3",{className:"m-4"},n.a.createElement("strong",null,"React Issue Tracker")),n.a.createElement("button",{className:"btn btn-outline-success mb-2",onClick:this.handleToggle},"Open a New Issue"),n.a.createElement(g,{show:this.state.isOpen,handleSubmit:this.handleSubmit,handleToggle:this.handleToggle}),n.a.createElement(h,{issues:this.state.issues,getBackground:this.getBackground}))}}]),a}(s.Component);a(15);l.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(p,null)),document.getElementById("root"))},9:function(e,t,a){e.exports=a(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.ce94c936.chunk.js.map
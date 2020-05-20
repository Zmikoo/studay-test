// 官方示例
import React from 'react';
import ReactDom from 'react-dom';
// import Son from './son';
// export const {Provider,Consumer} = React.createContext('default value');
// export default class App extends React.Component{
//     render(){
//         let name = '小人头';
//         return (
//             <Provider value = {name}>
//                 <div style={{border:'1px solid red',width:'30%',margin:'50px auto',textAlign:'center'}}>
//                     <p>父组件定义的值： {name}</p>
//                     <Son/>
//                 </div>
//             </Provider>
//         )
//     }
// }

// ReactDom.render(
//     <App/>,
//     document.getElementById('root')
// )
// ReactDom.render(
//     <h1>Hello,World!</h1>,
//     document.getElementById('root')
// )
// // JSX简介
// // 在JSX语法中，可以在大括号内放置任何有效的js表达式。
// const name = 'Josh Perez'
// const user = {
//     firstName: 'Haper',
//     lastName: 'Perea',
//     avatarUrl: './public/logo192.png'
// }
// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
// }

// // JSX表达式会被转为普通JS函数调用，并且对其取值后得到的JS对象，
// // 所以，可以在if语句或for循环代码块中使用JSX,或将JSX赋值给变量，或者把JSX当做参数传入，或从函数中返回JSX;
// function getGreeting(user) {
//     if (user) {
//         return <h1>Hello, {formatName(user)}</h1>
//     }
//     return <h1>Hello,Stranger</h1>
// }
// const element = <h1>Hello,{formatName(user)} and {name}!</h1>
// // JSX特定属性：可以使用引号来将属性值设为字符串，也可以使用大括号在属性值中插入JS表达式
// // JSX语法上更接近JS而不是HTML,所以ReactDOM使用小驼峰命名来定义属性名称，而不是使用HTML属性名称的命名约定
// // const Img = <img className='img' src={user.avatarUrl} alt='Img'></img>
// // 建议将内容包裹在扩号中，避免遇到自动插入分号的陷阱。JSX 标签里能够包含很多子元素:
// React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
// const element2 = (
//     <React.Fragment>
//         <h1>Hello</h1>
//         <h2>Good to see you here</h2>
//     </React.Fragment>
// )
// 也可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签：
// const element3 = (
//   <>
//       <h1>Hello</h1>
//       <h2>Good to see you here</h2>
//   </>
// )
// 深入JSX
// const MyComponents = {
//   DatePicker: function (props) {
//   return <div>My name is {props.firstName + ' ' + props.lastName} </div>
//   },
//   Welcome: function(props){
//     return <div>Welcome {props.firstName + ' ' + props.lastName} to China!</div>
//   }
// }


// function BlueDatePicker(props){
//   const name = {
//     firstName: 'Ben',
//     lastName: 'Hactor'
//   }
//   // 你不能将通用表达式作为 React 元素类型。如果你想通过通用表达式来（动态）决定元素类型，你需要首先将它赋值给大写字母开头的变量。这通常用于根据 prop 来渲染不同组件的情况下
//   const CurrComponent = MyComponents[props.name];
//   // 在 JSX 中，你也可以使用点语法来引用一个 React 组件。
//   // return <MyComponents.DatePicker color='blue'/>
//   // 可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象
//   return <CurrComponent {...name}/>
// }


// const Button = props => {
//   // 可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 props 传递下去。
//   const {kind,...other} = props;
//   const className = kind === 'primary' ? 'ParimaryButton' : 'SecondaryButton';
//   // kind 的 prop 会被安全的保留，它将不会被传递给 <button> 元素。 所有其他的 props 会通过 ...other 对象传递，此处传递了一个 onClick 和 children 属性。
//   return <button className={className} {...other}/>;
// }
// const App = () => {
//   return (
//     <div>
//         <Button kind = 'primary' onClick = { () => console.log('clicked!')}>Hello World!</Button>
//     </div>
//   )
// }
// class Arr extends React.Component{
//   render() {
//     // React 组件也能够返回存储在数组中的一组元素,不需要用额外的元素包裹列表元素！
//     return [
//       <li key="A">First</li>,
//       <li key="B">Second</li>,
//       <li key="C">Third</li>
//     ]
//   }
// }
// function Repeat(props) {
//   let items = [];
//   for (let i = 0; i < props.numTimes; i++) {
//     items.push(props.children(i));
//   }
//   return <div>{ items }</div>
// }

// function ListOfTenThings() {
//   return (
//     <Repeat numTimes={10}>
//       {/* 可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。这种用法并不常见，但可以用于扩展 JSX。 */}
//       {(index) => <div key = {index}>This is item {index} in the list</div>}
//     </Repeat>
//   )
// }
// ReactDom.render(
//     // getGreeting(user),
//     // element,
//     // Img,
//     element2,
//     element3,
//     // 可以把包裹在 {} 中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素
//     // <BlueDatePicker name={'Wel' + 'come'}/>,
//     // <App/>,
//     // <Arr/>,
//     // <ListOfTenThings/>,
//     document.getElementById('root')
// )
// // 元素渲染
// // 元素是构成React应用的最小砖块，元素不等于组件，组件由元素构成
// // 仅使用 React 构建的应用通常只有单一的根 DOM 节点。如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

// // 组件 & props
// // 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。
// // 定义组件最简单的方式就是编写 JavaScript 函数：该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。
// function Welcome(props) {
//     return <h1>Hello,{props.name}</h1>
// }
// // 你同时还可以使用 ES6 的 class 来定义组件：和上边的函数是等效的
// class Welcome extends React.Component{
//     render(){
//         return <h1>Hello,{this.props.name}</h1>
//     }
// }
// // React 元素也可以是用户自定义的组件：
// // 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为 “props”
// // 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。
// const element3 = <Welcome name='Sara'/>

// function App() {
//     return (
//         <div>
//             <Welcome name = 'Sata'/>
//             <Welcome name = 'Cache'></Welcome>
//         </div>
//     )
// }
// // 通常新的React应用程序顶层组件都是App组件
// ReactDom.render(
//     <App/>,
//     document.getElementById('root')
// )

// // 组件拆分
// function Avatar(props) {
//     return (
//         <img className = 'Avatar'
//             src = {props.user.avatarUrl}
//             url = {props.user.name}
//         />
//     )
// }

// function UserInfo(props){
//     return (
//         <div className = 'UserInfo'>
//             <Avatar user={props.user}/>
//             <div className = 'UserInfo-name'>
//                 {props.user.name}
//             </div>
//         </div>
//     )
// }

// function Comment(props){
//     function formatData(date){
//         return 111;
//     }
//     return (
//         <div className = 'Comment'>
//             <UserInfo user = {props.author}/>
//             <div className = 'Comment-text'>
//                 {props.text}
//             </div>
//             <div className = 'Comment-date'>
//                 {formatData(props.date)}
//             </div>
//         </div>
//     )
// }

// // State & 声明周期

// class Clock extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             date: new Date()
//         }
//     }
//     // render()结束后会执行componentDidMount
//     componentDidMount() {// 在组件已经被渲染到 DOM 中后运行
//         this.timeID = setInterval(()=>{
//             // state不能直接修改，如：this.state.date = new Date(),构造函数是唯一可以给this.state赋值的地方
//             // 除了拥有并设置了它的state，其他组件都无法访问state。
//             // 组件可以选择把它的 state 作为 props 向下传递到它的子组件中,但是子组件本身无法知道它是来自于父组件的 state，或是父组件的 props，还是手动输入的
//             // 任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。
//             // 如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。
//             this.setState({
//                 date: new Date()
//             })
//         },1000)

//     }
//     componentWillUnmount() {// Clock组件从DOM中移除后会执行
//         clearInterval(this.timeID);
//     }
//     render () {
//         return (
//             <div>
//                 <h1>Hello,World!</h1>
//                 <h2>It is {this.state.date.toLocaleTimeString()}</h2>
//             </div>
//         )
//     }
// }
// ReactDom.render(
//     <Clock/>,
//     document.getElementById('root')
// )

// 事件处理
// function EventHandler() {
//     function activeLasers(){
//         console.log('Button was clicked');
//     }
//     function handleClick(e){// 在这里e是一个合成事件。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题
//         e.preventDefault();// 不能通过return false 的方式阻止默认行为,必须显式的使用preventDefault
//         console.log('The link was clicked');
//     }
//     // 疑问： return什么时候需要被render()包裹，什么时候不需要呢？答： class中需要被包裹，函数中不需要被包裹
//     // 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
//     // React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
//     return (
//         <div>      
//             <button onClick={activeLasers}>activeLasers</button>
//             <a href="#" onClick={handleClick}>clicked me</a>
//         </div>
//     );
// }
// ReactDom.render(
//     <EventHandler/>,
//     document.getElementById('root')
// )

// class Toggle extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             isToggleOn: true
//         }
//         // 使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。
//         // 在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。
//         this.handlerClick = this.handlerClick.bind(this);
//     }
//     handlerClick(){
//         this.setState(state => ({
//             isToggleOn: !state.isToggleOn
//         }))
//     }

//     render(){
//         // 通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。
//         return(
//             <button onClick = {this.handlerClick}>
//                 {this.state.isToggleOn ? 'ON' : 'OFF'}
//             </button>
//         )
//     }
// }
// ReactDom.render(
//     <Toggle/>,
//     document.getElementById('root')
// )

// 条件渲染

// function UserGreeting(props) {
//     return <h1>Welcome back!</h1>
// }
// function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>
// }
// function Greeting(props){
//     const isLoggedId = props.isLoggedIn;
//     if (isLoggedId) {
//         return <UserGreeting/>;
//     }
//     return <GuestGreeting/>;
// }

// function LoginButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Login
//         </button>
//     )
// }
// function LogoutButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Logout
//         </button>
//     )
// }

// class LoginControl extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoggedIn: true
//         }
//         this.handleLoginClick = this.handleLoginClick.bind(this);
//         this.handleLogoutClick = this.handleLogoutClick.bind(this);
//     }
//     handleLoginClick(){
//         this.setState({isLoggedIn: true});
//     }
//     handleLogoutClick(){
//         this.setState({isLoggedIn: false});
//     }

//     render() {
//         const isLoggedIn = this.state.isLoggedIn;
//         let button;
//         if (isLoggedIn) {
//             button = <LogoutButton onClick = {this.handleLogoutClick}/>
//         } else {
//             button = <LoginButton onClick = {this.handleLoginClick}/>
//         }

//         return (
//             <div>
//                 <Greeting isLoggedIn = {isLoggedIn}/>
//                 {button}
//             </div>
//         )
//     }
// }
// ReactDom.render(
//     <LoginControl/>,
//     document.getElementById('root')
// )

// 简化版可以使用三元运算符或短路运算符
// function Mailbox(props) {
//     const unreadMessages = props.unreadMessages;
//     return (
//         <div>
//             <h1>Hello!</h1>
//             {
//                 unreadMessages.length > 0 && <h2> You have {unreadMessages} unread messages</h2>
//             }
//             <div> {unreadMessages.length > 0 ? 'hava massages' : 'no massages'} </div>
//         </div>
//     )
// }
// const messages = ['React','Re:React','Re:Re:React'];
// ReactDom.render(
//     <Mailbox unreadMessages={messages}/>,
//     document.getElementById('root')
// )

// function WarningBanner(props) {
//     if (!props.warn) {
//         return null;
//     }
//     return (
//         <div className='warning'>Warning!</div>
//     )
// }
// class Page extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {showWarning: true};
//         this.handleToggleClick = this.handleToggleClick.bind(this);
//     }
//     handleToggleClick(){
//         this.setState(state => ({
//             showWarning: !state.showWarning
//         }))
//     }

//     render(){
//         return (
//             <div>
//                 <WarningBanner warn={this.state.showWarning}/>
//                 <button onClick = {this.handleToggleClick}>
//                     {this.state.showWarning ? 'Hide' : 'Show'}
//                 </button>
//             </div>
//         )
//     }
// }

// ReactDom.render(
//     <Page/>,
//     document.getElementById('root')
// )

// 列表 & Key
// function ListItem(props) {
//     // key值不应设在这里，应该设在map方法中的元素里
//     // 此处可以读出props.value，但不能读出props.key
//     return <li>{props.value}</li>
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map(number => {
//         // 如果列表项目的顺序可能会变化，不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。
//         // key只需在其兄弟节点间是唯一的，不需要是全局唯一的
//         // key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，需要用其他属性名显式传递这个值
//         // return <li key={number.toString()}>{number}</li>
//         return <ListItem key={number.toString()}
//                     value={number}/>
//     })
//     return (
//         <div>
//             <ul>{listItems}</ul>
//         </div>
//     )
// }
// const numbers = [1,2,3,4,5];
// ReactDom.render(
//     <NumberList numbers = {numbers}/>,
//     document.getElementById('root')
// )

// 表单
// class NameForm extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {value: ''};
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }
//     handleChange(event){
//         this.setState({value:event.target.value});
//     }
//     handleSubmit(event){
//         alert('提交的名字' + this.state.value);
//         event.preventDefault();
//     }
//     render(){
//         return (
//             <form onSubmit = {this.handleSubmit}>
//                 <label>
//                     <input type='text' value={this.state.value} onChange={this.handleChange} />
//                     <textarea value={this.state.value} onChange = {this.handleChange}/>
//                 </label>
//                 <input type='submit' value='提交' />
//             </form>
//         )
//     }
// }

// class FlavorForm extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {value:'coconut'};
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }
//     handleChange(event){
//         this.setState({value:event.target.value});
//     }
//     handleSubmit(event){
//         alert('提交的名字' + this.state.value);
//         event.preventDefault();
//     }
//     render(){
//         return (
//             <form>
//                 <label>
//                     选择你喜欢的风味：
//                     {/* 可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项 */}
//                     <select value={this.state.value} onChange={this.handleChange}>
//                         <option value="orange">橘子</option>
//                         <option value="coconut">叶子</option>
//                         <option value="banana">香蕉</option>
//                     </select>
//                 </label>
//             </form>
//         )
//     }
// }
// class Reservation extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isGoing: true,
//             numberOfGuests: 2
//         }
//         this.handleInputChange = this.handleInputChange.bind(this);
//     }
//     handleInputChange(event){
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value // ES6 计算属性名称的语法
//         })
//     }
//     render(){
//         return (
//             <form>
//                 <label>
//                     参与：
//                     <input 
//                         name = 'isGoing'
//                         type = 'checkbox'
//                         checked = {this.state.isGoing}
//                         onChange = {this.handleInputChange}
//                     />
//                 </label>
//                 <label>
//                     来宾人数：
//                     <input
//                         name = 'numberOfGuests'
//                         type = 'number'
//                         value = {this.state.numberOfGuests}
//                         onChange = {this.handleInputChange}
//                     />
//                 </label>
//             </form>
//         )
//     }
// }
// ReactDom.render(
//     <div>
//         <NameForm/>
//         <FlavorForm/>
//         <Reservation/>
//     </div>,
//     document.getElementById('root')
// )

// 状态提升 TODO
// function BoilingVerdict(props) {
//     if (props.celsius >= 100) {
//         return <p>The water would boil</p>
//     }
//     return <p>The water would not boil</p>
// }

// const scaleNames = {
//     c: 'Celsius',
//     f: 'Fahrenheit'
// }
// class TemperatureInput extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             temperature:''
//         };
//         this.handleChange = this.handleChange.bind(this);
//     }
//     handleChange(e){
//         this.setState({temperature: e.target.value})
//     }
//     toCelsius(fahrenheit){
//         return (fahrenheit - 32) * 5 / 9;
//     }
//     toFahrenheit(celsius){
//         return (celsius * 9 / 5) + 32;
//     }
//     render() {
//         const temperature = this.state.temperature;
//         const scale = this.props.scale;
//         return (
//             <fieldset>
//                 <legend>Enter temperature in {scaleNames[scale]}:</legend>
//                 <input value = {temperature} onChange = {this.handleChange}/>
//             </fieldset>
//         )
//     }
// }
// class Caculator extends React.Component{
//     render() {
//         return (
//             <div>
//                 <TemperatureInput scale='c'/>
//                 <TemperatureInput scale='f'/>
//             </div>
//         )
//     }
// }
// ReactDom.render(
//     <Caculator/>,
//     document.getElementById('root')
// )

// // 组合 vs 继承
function FancyBorder(props){
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            <div>
                这里是FancyBorder
            </div>
            {props.children}
        </div>
    )
}

function WelcomeDialog() {
    return (
        <div>
            <h1>hahahahhahh</h1>
            // JavaScript 表达式也可以被包裹在 {} 中作为子元素
            <FancyBorder color = 'blue'>
                <h1 className='Dialog-title'> 
                    Welcome
                </h1>
                <p className = 'Dialog-message'>
                    Thank you for visiting our spacecraft!
                </p>
            </FancyBorder>
        </div>
    )
}

function SplitPane(props) {
    return (
        <div className = 'SplitPane'>
            <div className = 'SplitPane-left'>
                {props.left}
            </div>
            <div className = 'SplitPane-right'>
                {props.right}
            </div>
        </div>
    )
}
function Contacts() {
    return <div className="Contacts">Contacts</div>;
  }
  
function Chat() {
    return <div className="Chat">Chat</div>;
}
function App() {
    // 组件可以接受任意 props，包括基本数据类型，React 元素以及函数。
    // 如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。
    return (
        <SplitPane
            left={
                <Contacts/>
            }
            right={
                <Chat/>
            }
        />
    )
}

function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          {props.title}
        </h1>
        <p className="Dialog-message">
          {props.message}
        </p>
        {props.children}
      </FancyBorder>
    );
  }
  
  class SignUpDialog extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.state = {login: ''};
    }
  
    render() {
      return (
        <Dialog title="Mars Exploration Program"
                message="How should we refer to you?">
          <input value={this.state.login}
                 onChange={this.handleChange} />
  
          <button onClick={this.handleSignUp}>
            Sign Me Up!
          </button>
        </Dialog>
      );
    }
  
    handleChange(e) {
      this.setState({login: e.target.value});
    }
  
    handleSignUp() {
      alert(`Welcome aboard, ${this.state.login}!`);
    }
  }

ReactDom.render(
    <div>
        <WelcomeDialog/>
        <App/>
    </div>,
    document.getElementById('root')
)
// 待阅读： 状态提升 React哲学，高级指引， anttd

// 高阶组件 参数为组件，返回值为新组件的函数 （组件是将props转换为UI,高阶组件是将组件转换为另一个组件）

// ref转发
// FancyButton 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button.这样，使用 FancyButton 的组件可以获取button 的 ref ，并在必要时访问
// 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
// Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中
// const FancyButton = React.forwardRef((props,ref) => (
//   // 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。
//   <button ref = {ref} className='FancyButton'>{props.children}</button>
// ));
// const ref = React.createRef();// 通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量
// ReactDom.render(
//   <FancyButton ref={ref}>Click me!</FancyButton>,
//   document.getElementById('root')
// )

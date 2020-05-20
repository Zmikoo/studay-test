// React Hook
import React,{useState,useEffect,useCallback,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Hook1(){
    // 通过在函数组件里调用它来给组件添加一些内部 state。useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。
    // useState 唯一的参数就是初始 state。这个初始 state 参数只有在第一次渲染时会被用到。
    // Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用。
    const [count,setCount] = useState(0);
    // useEffect跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。
    // 默认情况下，React 会在每次渲染后,即完成对 DOM 的更改后调用副作用函数 —— 包括第一次渲染的时候。
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    })
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}

// Hook使用规则
// 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
// 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（自定义的 Hook 中也可以调用）


function List(props){
    const [hei,setHei] = useState(0);
    console.log('List',hei)
    const listRef = useCallback(
            (node) => {
                if(node !== null) {
                    // console.log(node.getBoundingClientRect())
                    setHei(node.getBoundingClientRect().height)
                }
            },
            [],
        );
    const booksList = props.books.map((item,index) => {
        return (<img key={item} style={{height:'100px'}} className='book-cover' src={item}/>)
    })
    return (
        <div ref={listRef} id={props.id} className='books-col'>
            {booksList}
            <h1>Hell</h1>
        </div>
        )
}
function Measure(){
    const col1=[require('./imgs/1.jpg'),require('./imgs/2.jpg'),require('./imgs/3.jpg')]
    const [height,setHeight] = useState(0);
    console.log(height)
    const measuredRef = useCallback(
        (node) => {
            if(node !== null) {
                setHeight(node.getBoundingClientRect().height)
            }
        },
        [],
    );
    const h = useRef();
    return (
        <>
            <div className='books-box' ref={measuredRef}>
                <List id='col1' books = {col1 }/>
            </div>
        </>
    )
}
ReactDOM.render(
    <Measure/>,
    document.getElementById('root')
)
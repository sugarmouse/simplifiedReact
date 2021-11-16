import React, {Component}from './lib/react.js'
import ReactDOM,{render, renderComponent}from './lib/react-dom.js'


// class Menu extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//     return (
//       <h1>这是menu {this.props.name}</h1>
//     )
//   }
// }

function Menu (){
  return <h1>这是menu</h1>

}

class Div extends Component {
  constructor(props) {
    super(props)
    this.styObj = {
      color: "red",
      padding: '10px'
    }
    this.states = {
      name: 'sugarmouse',
      title: 'title from Div'
    }
  }
  clickMe() {
    this.setStates({
      name: 'tanghao',
    })
    console.log('点击事件绑定成功')
  }
  render() {
    return (
      <div>
        <Menu name={this.states.name}/>
        <div class="name" onClick={this.clickMe.bind(this)} style={this.styObj} id="first">hello</div>
        <div>world</div>
        <div>{this.states.name}</div>
        <div>{this.props.id}</div>
      </div>
    )
  }
}
// 这里因为用了 "@babel/preset-react" 所以 jsx 会被直接转化成 react.js 的代码， 调用 React.creatElement函数
// 并且会把 tag、 attrs、children 放到对应的位置

render(<Div id ='div component'> </Div>, document.body)



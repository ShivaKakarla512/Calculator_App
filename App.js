import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: "",
      period: 0,
      numbers: 0,
      total: 0,
      calculationText: "",
    }
    this.operations = ['D', '+', '-', '*', '/']
    this.state.resultStyle = {
      fontSize: 55,
    }
    this.state.calcStyle = {
      fontSize: 40,
    }
  }

  calculateResult() {
    const data = this.state.resultText.split('')
    if(data[data.length - 1] == '.') {
      data.pop()
      const temp = data.join('')
      this.setState({
        calculationText: eval(temp)
      })
    }
    else {
      const text = this.state.resultText
      const result = eval(text)
      var tempTwo = ''
      if(result != undefined) {
        tempTwo = (result.toString()).split('')
      } else {

      }
      if(tempTwo.length > 13 && tempTwo.length < 20) {
        this.setState({
          calcStyle: {
            fontSize: 30
          }
        })
      }
      else if (tempTwo.length > 19) {
        this.setState({
          calcStyle: {
            fontSize: 25
          }
        })
      }
      this.setState({
        calculationText: result
      })
    }
  }

  validate() {
    const text = this.state.resultText
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed(text) {
    if(text == '=') {
      this.setState({
        period: 0,
        numbers: 0,
        resultText: '',
        total: 0,
        resultStyle: {
          fontSize: 55,
        }
      })
      return this.validate() && this.calculateResult()
    }

    if(text == 'C') {
      this.setState({
        resultText: '',
        numbers: 0,
        period: 0,
        total: 0,
        resultStyle: {
          fontSize: 55,
        }
      })
    }
    else if(text == '.') {
      this.state.period += 1
      if (this.state.period == 1) {
        this.setState({
          resultText: this.state.resultText + text
        })
      }
    }
    else {
      this.state.total += 1
      this.state.numbers += 1
      console.log(this.state.numbers);
      if(this.state.total > 9) {
        this.setState({
          resultStyle: {
            fontSize: 37
          }
        })
      }
      if(this.state.numbers == 15) {
        if(isNaN(text) == false) {
          this.state.numbers -= 1
          text = ""
        }
      }
      this.setState({
        resultText: this.state.resultText + text
      })
    }
  }

  operate(operation) {
    switch(operation) {
      case 'D':
        const text = this.state.resultText.split('')
        const last = text[text.length - 1]
        if(last == '.') {
          this.setState({
            period: 0,
          })
        } else if (isNaN(last) == false) {
          this.state.total -= 1
        }
        text.pop()
        this.setState ({
          resultText: text.join('')
        })
        if(this.state.total < 10) {
          this.setState({
            resultStyle: {
              fontSize: 55
            }
          })
        }
        break
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          period: 0,
          numbers: 0,
        })

        const lastChar = this.state.resultText.split('').pop()

        if(this.operations.indexOf(lastChar) > 0) return

        if(this.state.text == "") return
          this.setState({
            resultText: this.state.resultText + operation
          })

        if(this.state.resultText == "") {
          this.setState ({
            resultText: ""
          })
        }
    }
  }

  render() {

    let rows = []
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    for(let i = 0; i < 4; i++) {
      let row = []
      for(let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])} style={styles.right}>
          <Text style={styles.btnText}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.contain}>
        <StatusBar hidden/>
        <View style={styles.result}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{
                this.scrollView.scrollToEnd({animated: true});
            }}
          >
            <Text style={[styles.resultText, this.state.resultStyle]}>{this.state.resultText}</Text>
          </ScrollView>
        </View>
        <View style={styles.calculation}>
          <Text style={[styles.calculationText, this.state.calcStyle]}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
            <View style={styles.clearButton}>
              <TouchableOpacity onPress={() => this.buttonPressed('C')} style={styles.clear} underlayColor="rgba(0, 0, 0, 1)" >
                <Text style={styles.btnText}>C</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultText: {
    color: 'black',
  },
  calculationText: {
    color: 'black',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#434343',
  },
  clear: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#48D1CC',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#636363',
  },
  btnText: {
    fontSize: 35,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    width: 200,
    textAlign: 'center',
  },
  spacing: {
    marginTop: 10,
  },
  contain: {
    flex: 1,
  },
  result: {
    padding: 10,
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#3fbfba',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#494949',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#696969',
  },
});

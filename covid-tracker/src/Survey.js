import React from "react";
import SurveyData from './SurveyData'
import './styleSurvey.css'


export default class Survey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        userAnswer:null,    //current users answer
        currentIndex:0,  //current questions index
        options: [],       //the options
        surveyEnd: false, //True if it's the last question
        score: 0,      //the Score
        disabled: true, // cant go next until answer is selected
        symptoms: []
    }
  }

  loadQuiz = () => {
      const {currentIndex} = this.state;
      this.setState(() => {
          return {
              question: SurveyData[currentIndex].question,
              options: SurveyData[currentIndex].options,
              answer: SurveyData[currentIndex].answer
          }
      })
  }

  nextQuestionHandler = () => {
      const {userAnswer, answer, score, symptoms, currentIndex} = this.state

      if(userAnswer === answer){
          this.setState ({
              score: score + 1
          })
      }
      else {
        symptoms.push(SurveyData[currentIndex].id);
          this.setState ({
              symptoms
          })
      }

      this.setState({
          currentIndex: this.state.currentIndex + 1,
          disabled: true,
          userAnswer:null
      })

  }

  componentDidMount() {
      this.loadQuiz();
  }

  checkAnswer = answer => {
      this.setState({
          userAnswer: answer,
          disabled: false
      })
  }

  componentDidUpdate(prevProps, prevState) {
      const{currentIndex} = this.state;
      if(this.state.currentIndex !== prevState.currentIndex) {
        this.setState(() => {
            return {
                question: SurveyData[currentIndex].question,
                options: SurveyData[currentIndex].options,
                answer: SurveyData[currentIndex].answer
            }
        });
      }
  }

  finishHandler =() => {
      const {symptoms, currentIndex, userAnswer, answer, score} = this.state;
      let newScore;
    if(currentIndex === SurveyData.length -1){
        if(userAnswer !== answer) {
            symptoms.push(SurveyData[currentIndex].id);
        } else {
            newScore = score + 1;
        }
        this.setState({
            surveyEnd:true,
            symptoms,
            score: newScore
        })
    }

}


  render() {
      const{question, options, currentIndex, userAnswer, surveyEnd, score} = this.state

      if(surveyEnd) {
          let message;
          if(score === 9) {
              message = "You have no symptoms! Continue practicing social distancing"
          } else if (score > 6 && score < 9) {
              message = "You are advised to quarentine for 14 days"
          } else {
              message = "Please contact your local hospital for help"
          }
          return (
              <div>
                  <h1> {message}  ids {this.state.symptoms} {score} </h1>

                  <button onClick={this.props.submit}>Back to Home</button>

              </div>
          )
      }
    return (
      <div id="wrapper">
        <div id="main">
          <div id="title">Symptom Tracker</div>
          <div>
            <h2>{question}</h2>
            <span>{`Question ${currentIndex + 1} of ${SurveyData.length}`}</span>
            {
                options.map(option => 
                    <p key = {option.id} className ={`options ${userAnswer === option ? "selected" : null }`} 
                    onClick = {() => this.checkAnswer(option)}
                    >
                        {option}
                    </p>
                    )
            }

            {currentIndex < SurveyData.length - 1 &&
            <button disabled = {this.state.disabled} onClick = {this.nextQuestionHandler}>
                Next
            </button>}

            {currentIndex === SurveyData.length - 1 && 
            <button onClick = {this.finishHandler} 
            disable = {this.state.disabled}>
            Finish
            </button>}


          </div>
        </div>
      </div>
    );
  }
}


import React from 'react';
import createClass from 'create-react-class';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const Main = createClass({

  getInitialState() {
    return {
      canSubmit: false,
      addressValue: '',
      toggleVal: 'Sign Up',
       fixtures: [
      
      ],
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
  },

  styles: {
    paperStyle: {
      width: '33.3%',
      //width: '33.3%',
      height: '55%',
      backgroundColor: '#FFFFFF',
      borderRadius: '2.5em',
      //margin: 'auto',
      float: 'left',
      border: '20px solid #F7F9FB',
      padding: '8%',
      boxShadow: '#F7F9FB',
    },
    countSt:{
      fontSize: '5em',
      fontWeight: '100',
    },
    bodyBg:{
      color: '#F7F9FB',
      backgroundColor: '#F7F9FB',
    },
    header:{
      widht: '20%',
      textAlign: 'center',
    },
    tTable:{
      display: 'table',
    },
    tRow:{
      display: 'table-row',
    },
    tCell:{
      display: 'table-cell',
      width: '45%',
      borderBottomStyle: 'solid',
      borderBottomWidth: 'thin',
    },
    tCellR:{
      display: 'table-cell',
      width: '35%',
      borderBottomStyle: 'solid',
      borderBottomWidth: 'thin',
    }

  },

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },
 
  toggleUp(){
   console.log('state'+this.getState({toggleVal}));
   if(this.getState({toggleVal}) === 'Sign Up'){
    this.setState({toggleVal : 'Sign In'});

   }else{
    this.setState({toggleVal : 'Sign Up'});
   }
  },

  handleAddChange(){
    
  },

  componentDidMount(){
   Promise.all([
      fetch('https://8z74to6yra.execute-api.us-east-1.amazonaws.com/production/candidates?status=pending')
      .then((response) => response.json())
      .then((responseJson) => {
        let pCand = responseJson.map((res) =>{
          return(
                <div style={this.styles.tTable}>
                  <div style={this.styles.tRow}>
                    <div key={res.id} style={this.styles.tCell}>{res.name}</div> 
                    <div key={res.dob} style={this.styles.tCellR}>{res.dob}</div>
                  </div>
                </div>
          )
        })
        this.setState({
          pCount: responseJson.length,
          pCandidate: pCand
        });

      }),
      fetch('https://8z74to6yra.execute-api.us-east-1.amazonaws.com/production/candidates?status=clear')
      .then((response) => response.json())
      .then((responseJson) => {
        let cCand = responseJson.map((res) =>{
          return(
                <div style={this.styles.tTable}>
                  <div style={this.styles.tRow}>
                    <div key={res.id} style={this.styles.tCell}>{res.name}</div> 
                    <div key={res.dob} style={this.styles.tCellR}>{res.dob}</div>
                  </div>
                </div>
          )
        })
        this.setState({
          cCount: responseJson.length,
          cCandidate: cCand
        });

      }),
      fetch('https://8z74to6yra.execute-api.us-east-1.amazonaws.com/production/candidates?status=suspended')
      .then((response) => response.json())
      .then((responseJson) => {
        let sCand = responseJson.map((res) =>{
          return(
                <div style={this.styles.tTable}>
                  <div style={this.styles.tRow}>
                    <div key={res.id} style={this.styles.tCell}>{res.name}</div> 
                    <div key={res.dob} style={this.styles.tCellR}>{res.dob}</div>
                  </div>
                </div>
          )
        })
        this.setState({
          sCount: responseJson.length,
          sCandidate: sCand
        });

      }),
    ]);
    

    /*
    return fetch('https://8z74to6yra.execute-api.us-east-1.amazonaws.com/production/candidates?status=pending')
      .then((response) => response.json())
      .then((responseJson) => {
        let count = 0;
        let candi = responseJson.map((res) =>{
          count = count +1;
          return(
                <div style={this.styles.tTable}>
                  <div style={this.styles.tRow}>
                    <div key={res.id} style={this.styles.tCell}>{res.name}</div> 
                    <div key={res.dob} style={this.styles.tCellR}>{res.dob}</div>
                  </div>
                </div>
          )
        })
        this.setState({
          count: count,
          candidate: candi
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
      console.log(this.getState(candiate)); */
  },

  render() {
    let {paperStyle, header, bodyBg, countSt} = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
      <div style={bodyBg}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <div style={header}>
            <h1 style={countSt}>{this.state.pCount}</h1>
            <h2>Pending</h2>
          </div>
          <div style={this.styles.tTable}>
                  <div style={this.styles.tRow}>
                    <div style={this.styles.tCell}>Name</div> 
                    <div style={this.styles.tCellR}>Date Of Birth</div>
                  </div>
          </div>
          <div className="navigation">
             {this.state.pCandidate}
            </div>
  
        </Paper>
        </MuiThemeProvider>

        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <div style={header}>
            <h1 style={countSt}>{this.state.cCount}</h1>
            <h2>Clear</h2>
          </div>
          <div style={this.styles.tTable}>
                  <div style={this.styles.tRow}>
                    <div style={this.styles.tCell}>Name</div> 
                    <div style={this.styles.tCellR}>Date Of Birth</div>
                  </div>
          </div>
          <div className="navigation">
             {this.state.cCandidate}
            </div>
  
        </Paper>
        </MuiThemeProvider>
         <MuiThemeProvider muiTheme={getMuiTheme()}>
         <Paper style={paperStyle}>
          <div style={header}>
            <h1 style={countSt}>{this.state.sCount}</h1>
            <h2>Suspended</h2>
          </div>
          <div style={this.styles.tTable}>
                  <div style={this.styles.tRow}>
                    <div style={this.styles.tCell}>Name</div> 
                    <div style={this.styles.tCellR}>Date Of Birth</div>
                  </div>
          </div>
          <div className="navigation">
             {this.state.sCandidate}
            </div>
  
        </Paper>
      </MuiThemeProvider>
    </div>
      
    );
  },
});

export default Main;

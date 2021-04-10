import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorData: [],

      timeSlot: []

    }
  }

  componentDidMount() {
    var pwd = {
      strategy: 'local',
      email: 'benjamin.benny1995@outlook.com',
      password: '12345678',
    }
    var config = {
      headers: {
        'api-header-security': 'C1kxIHN1D81zT7DXFQINoiQKDRXIMLCWTugbg9CorYg5SIxHsBBLNvNbebCxoC1qWhtx',
        'content-type': 'application/json'
      },

    };

    axios({
      method: 'post',
      url: 'https://dapi.quikdr.com/authentication',
      headers: {
        'api-header-security': 'C1kxIHN1D81zT7DXFQINoiQKDRXIMLCWTugbg9CorYg5SIxHsBBLNvNbebCxoC1qWhtx',
        'content-type': 'application/json'
      },
      data: {
        strategy: 'local',
        email: 'benjamin.benny1995@outlook.com',
        password: '12345678',
      }
    })
      .then((response) => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + response.access_token;
        axios({
          method: 'post',
          url: 'https://dapi.quikdr.com/search?limit=50&skip=0',
          headers: {
            'api-header-security': 'C1kxIHN1D81zT7DXFQINoiQKDRXIMLCWTugbg9CorYg5SIxHsBBLNvNbebCxoC1qWhtx',
            'content-type': 'application/json',
            'Authorization': 'Bearer' + response.access_token
          },
          data: {

            "city": "",
            "name": "",
            "location": "",
            "startdate": "2020-09-05",
            "enddate": "2020-09-19",
            "consult": "[1,3,2,4]",
            "rating": "",
            "gender": "",
            "orgfeelow": 0,
            "spec": "[]",
            "orgfeehigh": 5000

          }
        }).then((response2) => {
          console.log("doctor", response2.data)
          this.setState({
            doctorData: response2.data
          }, () => console.log("data", this.state.doctorData))


        }).catch(error => {
          console.log(error)
        })

      })
    axios({
      method: 'get',
      url: 'https://dapi.quikdr.com/schedules?doctorsId=61&organisationsId=2&&date[$gte]=2020-09-15&date[$lte]=2020-09-22&$skip=0&$limit=500&$sort[date]=1&$sort[time]=1',
      headers: {
        'api-header-security': 'C1kxIHN1D81zT7DXFQINoiQKDRXIMLCWTugbg9CorYg5SIxHsBBLNvNbebCxoC1qWhtx',
        'content-type': 'application/json',

      },

    })
      .then(res => {
        console.log("timeslot", res.data.data)
        this.setState({
          timeSlot: res.data.data
        }, () => console.log("slot", this.state.timeSlot))

      })
      .catch(error => {
        console.log(error)
      })

  }






  render() {
    return <div>
      {this.state.doctorData && this.state.doctorData.map((item) => {
        return (
          <div className="main-content-container container-fluid px-4">
            <div className="page-header row no-gutters py-4">
              <div className="col-12 col-sm-12 text-center text-sm-left mb-0">
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-small mb-4 pt-2">
                  <div className="card-header border-bottom text-center">
                    <div className="mb-3 mx-auto">
                    </div>
                    <img
                      className="border-radius: 50% display:inline-block"
                      src={item.profilephotourl}
                      alt={`${item.initials} ${item.firstName} ${item.lastName}`}
                      width={110}
                      height={110}
                      style={{ objectFit: "cover" }}

                    />

                    <ul className="list-group list-group-flush display:inline-block">
                      <h3 className="page-title">{`${item.initials} ${item.firstName} ${item.lastName}`}</h3>
                      <li className="list-group-item px-4">
                        <i
                          className="material-icons myicons mr-2 pt-1"
                          datatoggle="tooltip"
                          title="descriptions"
                        >
                          <span className="text-dark mdweight">
                            {item.descriptions}
                          </span>
                        </i>
                      </li>
                      <li className="list-group-item px-4">{item.dob}</li>
                      <li className="list-group-item px-4">{item.experience}</li>
                      <li className="list-group-item px-4">{item.feeAmount}</li>
                      <li className="list-group-item px-4">{item.gender}</li>
                      <li className="list-group-item px-4">{item.nationality}</li>
                      <li className="list-group-item px-4">{item.orgname}</li>
                      <li className="list-group-item px-4">{item.quikdrFeeAmount}</li>
                      <li className="list-group-item px-4">{item.registrationNumber}</li>
                      <li className="list-group-item px-4">{item.specialization}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      })}
    </div>

  }


}


export default App;

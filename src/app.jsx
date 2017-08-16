import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'


// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      container: {
        available:['ogg', 'wav', 'mp3', 'flac'],
        current: 'ogg'
      },
      bitrate: {
        available:[128, 256, 512],
        current: 256
      },
      samplerate: {
        available: [22000, 44100, 48000, 96000],
        current: 44100
      },
      files: []
    }
  }

  processFiles(){
    var uri = './script.php'
    var xhr = new XMLHttpRequest()
    var fd = new FormData()
    
    xhr.open('POST', uri, true)

    xhr.onprogress = (e) => {
      if (e.lengthComputable) {  
        const percentComplete = (e.loaded / e.total) * 100
        console.log('%' + percentComplete)
        //$('#progressbar').progressbar( "option", "value", percentComplete );
      } 
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {

        if (xhr.status === 200) {
          // XHR END WITH SUCCESS
          console.log('SUCCESS', xhr.responseText) // handle response.
          // create blob from response

          // URL.createObjectURL(blob)
        } else {
          // XHR END WITH ERROR
          console.log('ERROR', xhr.responseText) // handle response.
        }       
      }
    }

    fd.append('container', this.state.container.current)
    fd.append('bitrate', this.state.bitrate.current)
    fd.append('samplerate', this.state.samplerate.current)

    this.state.files.forEach( (file, index) => {
      fd.append(index, file)
    })
    
    // Initiate a multipart/form-data upload
    xhr.send(fd)
  }

  addFiles(fileList) {
    const added = []
    Object.keys(fileList).forEach(index => {      
      added.push(fileList[index])
    })   

    this.setState(Object.assign(this.state, {files: this.state.files.concat(added)}))
  }

  deleteFile(index){
    const cloned = Array.from(this.state.files)
    cloned.splice(index, 1)
    this.setState(Object.assign(this.state, {files: cloned}))
  }

  render() {
    return(
      <div className="container">
        <div className="form-group">
          <label>Fichier(s) à encoder</label>
          <input type="file" id="input" className="form-control"  multiple onChange={(e) => this.addFiles(e.target.files)} />
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="radio">
              <label>
                <input 
                  onChange={() => 
                    this.setState(Object.assign(this.state.container, {current: 'mp3'}))
                  } 
                  type="radio" 
                  name="optionsRadios"
                  value="mp3" 
                  checked={this.state.container.current === 'mp3'}/>
                  Encoder en mp3
              </label>
            </div>
            <div className="radio">
              <label>
                <input 
                  onChange={() => 
                    this.setState(Object.assign(this.state.container, {current: 'ogg'}))
                  } 
                  type="radio" 
                  name="optionsRadios"
                  value="ogg" 
                  checked={this.state.container.current === 'ogg'}/>
                  Encoder en ogg
              </label>
            </div>    
            <div className="radio">
              <label>
                <input 
                  onChange={() => 
                    this.setState(Object.assign(this.state.container, {current: 'wav'}))
                  } 
                  type="radio" 
                  name="optionsRadios"
                  value="wav" 
                  checked={this.state.container.current === 'wav'}/>
                  Encoder en wav
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="radio">
              <label>
                <input 
                  onChange={() => 
                    this.setState(Object.assign(this.state.bitrate, {current: 128}))
                  } 
                  type="radio" 
                  name="optionsRadios2"
                  value={128} 
                  checked={this.state.bitrate.current === 128}/>
                  128Kb/s
              </label>
            </div>
            <div className="radio">
              <label>
                <input 
                  onChange={() => 
                    this.setState(Object.assign(this.state.bitrate, {current: 256}))
                  } 
                  type="radio" 
                  name="optionsRadios2"
                  value={256} 
                  checked={this.state.bitrate.current === 256}/>
                  256Kb/s
              </label>
            </div>
            <div className="radio">
              <label>
                <input 
                  onChange={() => 
                    this.setState(Object.assign(this.state.bitrate, {current: 512}))
                  } 
                  type="radio" 
                  name="optionsRadios2"
                  value={512}
                  checked={this.state.bitrate.current === 512}/>
                  512Kb/s
              </label>
            </div> 
          </div>
          <div className="col-md-4">
          <div className="radio">
            <label>
              <input 
                onChange={() => 
                  this.setState(Object.assign(this.state.samplerate, {current: 44100}))
                } 
                type="radio" 
                name="optionsRadios3" 
                value={44100} 
                checked={this.state.samplerate.current === 44100}/>
                44,1KHz
            </label>
          </div>
          <div className="radio">
            <label>
              <input 
                onChange={() => 
                  this.setState(Object.assign(this.state.samplerate, {current: 48000}))
                } 
                type="radio" 
                name="optionsRadios3"
                value={48000}
                checked={this.state.samplerate.current === 48000}/>
                48KHz
            </label>
          </div>
          <div className="radio">
            <label>
              <input 
                onChange={() => 
                  this.setState(Object.assign(this.state.samplerate, {current: 96000}))
                } 
                type="radio" 
                name="optionsRadios3"
                value={96000} 
                checked={this.state.samplerate.current === 96000}/>
                96KHz
            </label>
          </div> 
        </div>
        </div>
        <button disabled={this.state.files.length === 0} onClick={() => this.processFiles()} className="btn btn-default text-right">Envoyer</button>
        <hr/>
        <table className="table table-stripped">
          <tbody>
          {this.state.files.map((file, index) => 
            <tr key={index}>
              <td>{file.name}</td>
              <td><button onClick={() => this.deleteFile(index)}>delete</button></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

App.propTypes = {}

export default App

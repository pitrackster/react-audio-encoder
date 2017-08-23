import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'


// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

class App extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
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
      files: [],
      objectUrl: null,
      processing: false
    }
  
    this.state = this.initialState
  }

  processFiles(){
    var uri = './script.php'
    var xhr = new XMLHttpRequest()
    var fd = new FormData()

    this.setState(Object.assign(this.state, {processing: true}))

    xhr.responseType = 'blob'    
    xhr.open('POST', uri, true)

    // not used
    xhr.onprogress = (e) => {
      if (e.lengthComputable) {  
        //const percentComplete = (e.loaded / e.total) * 100
      } 
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.setState(Object.assign(this.state, {processing: false}))
        if (xhr.status === 200) {
          // XHR END WITH SUCCESS
          console.log('success', xhr)
          // get blob response
          const blob = xhr.response
          const objectURL = window.URL.createObjectURL(blob)
          this.setState(Object.assign(this.state, {objectUrl: objectURL}))
        } else {
          // XHR END WITH ERROR
          console.log('ERROR', xhr.responseText)
        }
        
        //this.setState(Object.assign(this.state, this.initialState))
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
          <input type="file" id="input" accept="audio/*" className="form-control"  multiple onChange={(e) => this.addFiles(e.target.files)} />
        </div>
        <div className="row">
          {/* CONTAINER */}
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
                  MP3
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
                 OGG
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
                  WAV (16 bits)
              </label>
            </div>
          </div>
          {/* BITRATE */}
          <div className="col-md-4">
            {this.state.container.current !== 'wav' && 
              <div>
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
            }            
          </div>
          {/* SAMPLERATE */}
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
        <table className="table table-stripped">
          <tbody>
          {this.state.files.length > 0 && this.state.files.map((file, index) => 
            <tr key={index}>
              <td>{file.name}</td>
              <td><button className="btn btn-danger fa fa-trash" onClick={() => this.deleteFile(index)}></button></td>
            </tr>
          )}
          {this.state.files.length === 0 &&
            <tr>
              <td><h3>Aucun fichier actuellement - Veuillez sélectionner un ou plusieurs fichiers à convertir...</h3></td>
            </tr>
          }
          </tbody>
        </table>
        <hr/>
        <div className="row">
          <div className="col-md-6">
            {this.state.objectUrl !== null && 
              <a href={this.state.objectUrl} className="btn btn-primary" download="encoded.zip"><i className="fa fa-file-archive-o"></i>&nbsp;Download</a>
            }
          </div>
          <div className="col-md-6 text-right">            
            <button disabled={this.state.files.length === 0} onClick={() => this.processFiles()} className="btn btn-default">Convertir</button>
          </div>
        </div>

        <Modal show={this.state.processing}>
          <Modal.Header>
            <Modal.Title>Veuillez patienter pendant le traitement des données.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row"> 
              <div className="col-md-12" style={{textAlign:'center'}}>
                <div className="fa fa-refresh fa-spin fa-3x fa-fw"></div>
                <span className="sr-only">Loading...</span>   
              </div>                
            </div>                   
          </Modal.Body>
        </Modal>        
      </div>
    )
  }
}

export default App

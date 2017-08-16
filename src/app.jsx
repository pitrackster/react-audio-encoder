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
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {

        if (xhr.status === 200) {
          // XHR END WITH SUCCESS
          console.log('SUCCESS', xhr.responseText) // handle response.
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
    console.log('delete at index ' + index)
    console.log (this.state)
    this.setState(Object.assign(this.state, {files: this.state.files.splice(1, index)}))
  }

  render() {
    return(
      <div className="container">
        <div className="form-group">
          <label>Fichier(s) à encoder</label>
          <input type="file" id="input" className="form-control"  multiple onChange={(e) => this.addFiles(e.target.files)} />
        </div>
        <button disabled={this.state.files.length === 0} onClick={() => this.processFiles()} className="btn btn-default text-right">Envoyer</button>

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

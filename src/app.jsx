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
        available: [44100, 96000, 22000],
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
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('XHR RESPONSE', xhr.responseText) // handle response.
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
    //return files.concat(added)
    

    this.setState(Object.assign(this.state, {files: this.state.files.concat(added)}))

    console.log('new state', this.state)


    /*console.log('add files', fileList)
    console.log('state before', this.state.files)
    const filesArray = Array.from(fileList)
    const existingFiles = Array.from(this.state.files)
    console.log(filesArray)
    existingFiles.push(filesArray)
    this.setState(Object.assign(this.state, {files: existingFiles}))
    console.log('state after', this.state)*/
  }

  onDownload(){
    URL.revokeObjectURL(this.state.objectUrl)
    this.setState({requestData: null, objectUrl: null})
  }

  render() {
    return(
      <div className="container">
        <div className="form-group">
          <label>Fichier(s) à encoder</label>
          <input type="file" id="input" className="form-control"  multiple onChange={(e) => this.addFiles(e.target.files)} />
        </div>
        <button disabled={this.state.files.length === 0} onClick={() => this.processFiles()} className="btn btn-default">Envoyer</button>
      </div>
    )
  }
}

App.propTypes = {}



export default App

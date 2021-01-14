const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");


if (require("electron-squirrel-startup")) {
 
  app.quit();
}

// let win;
// function createWindow() {
// win = new BrowserWindow();
// win.loadURL(url.format({
// 	pathname: path.join(__dirname, 'index.html'),
// 	protocol:'file',
// 	slashes: true
//     }));
    
    // win.webContents.openDevTools();
    // win.on('closed', () => {
    //     win = null;
    // })

// }


const createWindow = () => {
   
    const mainWindow = new BrowserWindow({
      width: 420,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
      },
    });
  
  
    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
      
    })
  };











const call = () => {
    let number = document.getElementById("number").value;
    console.log(number);
    let path = "files/recent.txt";
    let ul = document.getElementById("callPopUp");
    var date = new Date();
    
    var dateAppel =
      ("00" + date.getDate()).slice(-2) +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
  
    if (fs.existsSync(path)) {
      fs.appendFile(path, number + " " + dateAppel + ";", null, (err) => {
        const result = err ? err : "Calling ...";
        console.log(result);
      });
    } else {
      fs.writeFile(path, number + " " + dateAppel + ";",  null,(err) => {
        if (err) throw err;
      });
    }
    ul.innerHTML = number;
    document.getElementById("form").reset();
  };

  function saveNumber() {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number2").value;
  
    let path = "files/contact.txt";
  
    if (fs.existsSync(path)) {
      fs.appendFile(path, name + " " + number + ";", (err) => {
        const result = err ? err : "";
        console.log(result);
      });
    } else {
      fs.writeFile(path, name + " " + number + ";", (err) => {
        if (err) throw err;
      });
    }
    document.getElementById("form").reset();
  }

  const calls = () => {
    let path = "files/recent.txt";
  
    if (path === undefined) {
      console.log("No file");
      return;
    }
  
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        alert(err.message);
        return;
      }
  
      let callsHistorys = [];
  
      callsHistorys.push(data);
     
      let ul = document.querySelector("#lists");
      var html = ``;
  
      for (var i = 0; i < callsHistorys.toString().split(";").length - 1; i++) {
        html = `
        <div class="test">
      <li class="list-group-item my-2 "style="color: white;background-color: rgb(255 255 255 / 0%); border: none;font-size: 15px;padding: 0;">
      <img src="img/user.png" alt="" width="50px" height="50px">
      
          <span class="mr-8"> ${callsHistorys.toString().split(";")[i]}</span>
      </li>
      </div>
      `;
        ul.innerHTML = ul.innerHTML + html;
      }
    });
  };


  const listContacts = () => {
    let path = "files/contact.txt";
  
    if (path === undefined) {
      console.log("No file");
      return;
    }
  
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
  
      let contacts = [];
  
      contacts.push(data);
  
      let ul = document.querySelector("#contact");
  
      for (var i = 0; i < contacts.toString().split(";").length - 1; i++) {
        var html = `
        <div class="test">
        <li class="list-group-item my-2 "style="color: white;background-color: rgb(255 255 255 / 0%); border: none;font-size: 15px;padding: 0;">
      <img src="img/user.png" alt="" width="50px" height="50px">
        
          ${contacts.toString().split(";")[i]}
      </li>
      </div>
      `;
        ul.innerHTML = ul.innerHTML + html;
      }
    });
  };
  

  app.whenReady().then(createWindow);
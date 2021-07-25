const { time } = require('console');
var fs = require('fs');
var readline = require('readline');

fs.readFile('perf.csv', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    var rd = readline.createInterface({
      input: fs.createReadStream('perf.csv'),
      console: false
    });
    var temp = {
      content : "",
      noOfFiles : 0,
      totalTimeTaken : 0,
      min : 0,
      max : 0
    }
    var obj = {};
    var entities = ["notification","conversation","request_task","request_note","attachment","approval","request","worklog","task_comment","task_dependency","draft"];
    entities.forEach(function(entityName){
      obj[entityName] = Object.assign({}, temp); 
    });
    var report = "";
    var total = {
      noOfFiles : 0,
      averageTime : 0,
      totalTimeTaken : 0
    }

    var writeReport = function(){
      entities.forEach(function(entityName){
            
        var overview = "Total Number of "+entityName+ " migrated is "+ obj[entityName].noOfFiles+"\n" +
        "Total Time taken is " + (obj[entityName].totalTimeTaken/60000).toFixed(3) +" mins which has average of " +
        (obj[entityName].totalTimeTaken/obj[entityName].noOfFiles).toFixed(0) +"ms\n";
        
        if(entityName == 'request'){
          report = entityName + "," + obj[entityName].noOfFiles + "," + (obj[entityName].totalTimeTaken/obj[entityName].noOfFiles).toFixed(0) + "," 
                 +(obj[entityName].totalTimeTaken/60000).toFixed(3)+","+obj[entityName].min+","+obj[entityName].max+"\n" + report;
          report = "Entity Name,No of Files,Average Time Take(ms),Total Time Taken (mins),Minimum (ms),Maximum (ms)\n" + report;
        }
        else{
          report = report + entityName + "," + obj[entityName].noOfFiles + "," + (obj[entityName].totalTimeTaken/obj[entityName].noOfFiles).toFixed(0) + "," 
                 +(obj[entityName].totalTimeTaken/60000).toFixed(3)+","+obj[entityName].min+","+obj[entityName].max+"\n";
        }

        obj[entityName].content = "File Name,Time Taken (ms)\n" + obj[entityName].content;
        obj[entityName].content = overview+obj[entityName].content;

        total.noOfFiles += obj[entityName].noOfFiles;
        total.averageTime += (obj[entityName].totalTimeTaken/obj[entityName].noOfFiles).toFixed(0);
        total.totalTimeTaken += obj[entityName].totalTimeTaken;
        
        fs.writeFile(entityName+'.csv', obj[entityName].content, err => {
          if (err) {
            console.error(err)
          }
        });
      });
      
      report += "Total," + total.noOfFiles;
      report += "," + (total.totalTimeTaken / total.noOfFiles).toFixed(0);
      report += "," + (total.totalTimeTaken/60000).toFixed(3);

      fs.writeFile('report.csv', report, err => {
        if (err) {
          console.error(err)
        }
      });
    };
    
    rd.on('line', function(line) {
      if(line.indexOf(",") == -1){
        return;
      }
      var flag = false;
      var timeTaken = parseInt(line.substring(line.indexOf(",")+1));
      if(line.indexOf("attachment") >= 0){
        flag = true;
        obj.attachment.content = obj.attachment.content + line + "\n";
        obj.attachment.noOfFiles++;
        obj.attachment.totalTimeTaken += timeTaken;
        if(obj.attachment.min == 0){
          obj.attachment.min = timeTaken;
        }
        if(timeTaken < obj.attachment.min){
          obj.attachment.min = timeTaken;
        }
        if(timeTaken > obj.attachment.max){
          obj.attachment.max = timeTaken;
        }
      }
      else{
        entities.every(function(entityName){
          if(line.indexOf(entityName) >= 0){
            flag = true;
            obj[entityName].content = obj[entityName].content + line + "\n";
            obj[entityName].noOfFiles++;
            obj[entityName].totalTimeTaken += timeTaken;
            if(obj[entityName].min == 0){
              obj[entityName].min = timeTaken;
            }
            if(timeTaken < obj[entityName].min){
              obj[entityName].min = timeTaken;
            }
            if(timeTaken > obj[entityName].max){
              obj[entityName].max = timeTaken;
            }
            return false;
          }
          return true;
        });
      }
      if(!flag){
        console.log(line);
      }
    });

    rd.on("close",function(){
      writeReport();
    });
})

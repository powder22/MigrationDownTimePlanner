This tool helps to plan downtime required to migrate from On Premise to Cloud Service Desk Plus (OP2OD)


# MigrationLogAnalyzer

1, Set the pagination in the logs page to 1000
2, Copy the script in perfReport.js and paste in console (it will automatically copy the data and store it in clipboard)
3, Open a csv file and paste it from clipboard
4, Check the file name correctly referred in app.js
5, Run app.js in node runtime
6, Results will be written in separate files for each entity and final report can be found in report.csv file

Running Node Enviornment
1, Install nvm (node version manager)
2, Install npm (node package manager)
3, Install latest stable node version using nvm
4, Run npm in the app.js directory as `npm install app.js`
5, Run app.js in Node environment as `node app.js`

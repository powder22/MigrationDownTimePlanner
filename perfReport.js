// set pagination in zlogs as 1000
var asd = function(){
    a=jQuery(jQuery('[field="message"]'));
    console.log(a.length);
    if(a.length < 1000){
        console.error("less than 1000 ::: "+a.length);
        window.alert("less than 1000 ::: "+a.length);
        return;
    }
    b=a.toArray()
    s=""
    b.forEach(function(c){s=s+'###$$$$'+jQuery(c).text()})
    s=s.replaceAll("OP2ODZIPEntry :: TIME_RANGE:FILE_NAME:TOTAL_TIME is ","");
    s=s.replaceAll("###$$$$","\nboopathi");
    s=s.replaceAll(",","");
    s=s.replaceAll("\n:","  ,");
    while(s.indexOf('boopathi') > -1){
	    s=s.replace(/boopathi.*:/,""); 
    }
    copyToClipboard(s)
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
        document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
}
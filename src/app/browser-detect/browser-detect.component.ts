import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browser-detect',
  templateUrl: './browser-detect.component.html',
  styleUrls: ['./browser-detect.component.css']
})

export class BrowserDetectComponent implements OnInit {
  name = 'Angular';
  browserName: string = "";
  internetExplorerBoolean: boolean = false;

  //function for checking if internet explorer is been used
  CheckForInternetExplorer(){
    if (this.browserName == "IE"){
        this.internetExplorerBoolean = true;
    }
    else if (this.browserName == "MSIE"){
      this.internetExplorerBoolean =true;
    }

    else{
      this.internetExplorerBoolean = false;
    }
  }

  ngOnInit() {
      console.log(this.getBrowserVersion());
      this.browserName = this.getBrowserVersion();
      console.log(this.browserName);
      this.CheckForInternetExplorer();

  }
//function that checks the userAgent to match what browser is been used. IE uses msie or trident.
  getBrowserVersion(){

      //var userAgent= navigator.userAgent, tem,
      var userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)", tem,

      matchTest= userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

      if(/trident/i.test(matchTest[1])){

          tem=  /\brv[ :]+(\d+)/g.exec(userAgent) || [];

          return 'IE';

      }

      if(matchTest[1]=== 'Chrome'){
          tem= userAgent.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
          console.log(userAgent);
      }

      matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
      return matchTest[0];

  }
}

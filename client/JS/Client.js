client = new function ()
{
    var webSocket = false;
    var ws = new wsLib();
    
    this._onmessage = function(e){ 
        rep = JSON.parse(e.data);
        console.log(rep);
        this.onMessage(data)
    };

    this.onMessage = function(rep){
		console.log(rep);
        switch (rep.object){
            case "error":
                onError(rep);
                break;
            case "login":
                screen_wait.newUser(data.username,data.team);
				break;
		}
    };

    this.onError = function(e){
    };
    
    this.onClose = function(){
        var data = {object :"logout"};
        this.send(data);
        webSocket = false;
    };
    
    this.openConnection = function (ip){
        if(!webSocket){
            ws.openSocket(ip,
                this.onConnection,
                this.onClose,
                this.onMessage,
                this.onError );
        }
    };
    
    this.onConnection = function(){
        webSocket = true;
        screen_connection.connectSuccess();
    }

    this.send = function (data){
        if(webSocket && ! ws.isClosed()){
            ws.msg(data);
        }
        else{
            ws.close();
        }
    };
}
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace sigR.Hubs{
    public class ChatHub : Hub {
        public async Task SendMessage(string user, string message){
            await Clients.All.SendAsync("ReceiveMessage",user,message);
        }

        public async Task SendCoordinates(string ConnectionId,string ClientUserName,double Latitude,double Longitude){
            await Clients.Others.SendAsync("ReceiveCoordinates",ConnectionId,ClientUserName,Latitude,Longitude);
        }

    }
}
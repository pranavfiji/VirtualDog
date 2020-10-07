class Food{

    constructor(){
    var foodStack;
    var lastFed;
        
       this.image=loadImage("images/Milk.png");
    }

        getFoodStack(){
            var DBRef=database.ref("milk");
            DBRef.on("value",function(data){
                DBRef=data.val();
            });
        }

        updateFoodStack(){
            var DBRef=database.ref("/");
            DBRef.update({
                milk:position
               
            })
        }
        display(){
            var x=50;
            var y=80;

            imageMode(CENTER);
            image(this.food,10,5,50,50);

            if(this.foodStack!=0){
                for(var i=0;i<this.foodStack;i++){
                    if(i%10===0){
                        x=50
                        y=y+50
                    }
                }
                image(x,y,100,100);
            }

            if(gameState!="hungry"){
                feed.hide();
                dog.remove();
                addFood.hide();
            }else{
                feed.show();
                addFood.show();
                dog.addImage(dogKneel);
            }
            currentTime=hour();
            if(currentTime===(lastFed+1)){
                update("playing");
                food.garden();
            }else if(currentTime===(lastFed+2)){
                update("sleeping");
                food.bedRoom();
            } else if (currentTime>(lastFed+2)&& currentTime<(lastFed+4)){
                update("bathing");
                food.washRoom();
            }else{
                update("Hungry");
                food.display();
            }
        }
    
    bedRoom(){
        background(bedRoom,250,500);
    }

    garden(){
        background(garden,250,500)
    }
    washRoom(){
        background(washRoom,250,500)
    }


update(state){
    database.ref("/").update({
        gameState:state
    })
}
}
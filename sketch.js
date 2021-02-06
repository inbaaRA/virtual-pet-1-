var dog,sadDog,happyDog;
var database, foodStock, lastFed, foodS, fedTime, feed, addFood, foodObject;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObject = new Food();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog");
  feed.position(700,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Click here to add Food");
  addFood.position(800,100);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  foodObject.display();
  
  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })





  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock();
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  if(foodObject.getFoodStock()<=0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0);
  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  }
database.ref('/').update({
  food:foodObject.getFoodStock(),
  feedTime:hour()
})
}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
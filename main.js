status = "";
object = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function Start(){
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function gotResults(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
      if (status != ""){
        objectDetector.detect(video,gotResults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(object[i].label + "" + percent + "%",object[i].x + 15,object[i].y + 15);
            nofill();
            stroke("#FF0000");
            rect(object[i].x , object[i].y , object[i].width , object[i].height);

            if(object[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = object_name + "Found";
                synth = window.speechSynthesis;
                utterThis = new speechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_status").innerHTML = object_name + "Not Found";
            }
        }
      }
}
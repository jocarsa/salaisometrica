
               var contexto = document.getElementById("suelo").getContext("2d")
			   
				var suelo = new Image()
				suelo.src = "suelo.png"
				suelo.onload = function(){
					contexto.drawImage(suelo,0,0)
					 i = 20;
					console.log("ok cargado")
					cadena = "<div class='interior'>"
					/*
					cadena += "<div class='grandes'>"
					for(var j = 0;j<1000;j++){
						cadena += '<div class="celda grande" style="width:'+i*10+'mm;height:'+i*10+'mm;"></div>'
					}
					cadena += '</div>'
					*/
					cadena += "<div class='grandes'>"
					for(var x = 0;x<16;x++){
						for(var y = 0;y<16;y++){
						cadena += '<div class="celda grande" style="width:'+i*10+'px;height:'+i*10+'px;top:'+(i*x*10)+'px;left:'+(i*y*10)+'px"></div>'
						}
					}
					cadena += '</div>'
					cadena += "<div class='pequenos'>"
					for(var x = -10;x<64;x++){
						for(var y = -10;y<64;y++){
							var datos = contexto.getImageData(x+10,y+10,1,1)
						cadena += '<div class="celda seleccionable" style="width:'+i+'px;height:'+i+'px;top:'+((i*x)+(Math.random()-0.5)*0)+'px;left:'+(i*y)+'px;background:rgb('+datos.data[0]+','+datos.data[1]+','+datos.data[2]+')"></div>'
						}
					}
					cadena += '</div>'
					
					cadena += '</div>'
					document.getElementById("pagina").innerHTML = cadena;
					
					var task = document.getElementsByClassName("seleccionable");
				//console.log(task)
				for (i = 0; i < task.length; i++) {
					
					task[i].onclick = function () {
						//console.log("pos anterior:"+pos.x+","+pos.y)
						posanterior = {}
						posanterior.x = pos.x
						posanterior.y = pos.y
						//console.log(this.style.left)
						pos.x = this.style.left.replace("px","")
						pos.y = this.style.top.replace("px","")
						document.getElementById(name).style.left = (pos.x*1-360)+"px"
						document.getElementById(name).style.top = (pos.y*1+80)+"px"
						//console.log("pos final:"+pos.x+","+pos.y)
						//console.log(posanterior)
						//console.log(pos)
						var angleDeg = Math.atan2(pos.y - posanterior.y, pos.x - posanterior.x) * 180 / Math.PI;
						console.log(angleDeg)
						pos.a = angleDeg
						angulo = pos.a
						if(angulo > -180 && angulo <= -90){
							document.getElementById(name).style.backgroundPosition = "-192px bottom"
						}else if(angulo > -90 && angulo <= 0){
							document.getElementById(name).style.backgroundPosition = "-128px bottom"
						}else if(angulo > 0 && angulo <= 90){
							document.getElementById(name).style.backgroundPosition = "-64px bottom"
						}else if(angulo > 90 && angulo <= 180){
							document.getElementById(name).style.backgroundPosition = "0px bottom"
						}
					}
				}
				}
                
				
				
				
            var pos = {"x":0,"y":0}
            name = ""
            document.getElementById("self").addEventListener("blur", (event) => {
                  name=document.getElementById("self").value;
                document.getElementById("self").style.display = "none"
				document.getElementById("escenario").style.display = "block"
                });
            
			
			
            var temporizador = setTimeout("bucle()",1000)
            function bucle(){
                fetch('controller.php?o=read')
                .then(res => res.json())
                .then(res => dibuja(res))
                .catch( err => console.error(err));
                speech = ""
                if(document.getElementsByClassName('self')[0]){
                    speech = document.getElementsByClassName('self')[0].innerHTML
					speech = document.getElementById("selfbocadillo").innerHTML
                }
                if(name != ""){
                    fetch('controller.php?o=write&px='+pos.x+'&py='+pos.y+"&name="+name+"&speech="+speech+"&a="+pos.a);
                }
                clearTimeout(temporizador);
                temporizador = setTimeout("bucle()",1000)
            }
            function dibuja(res){
				console.log(res) 
                for(let i = 0;i<res.length;i++){
                    if(!document.getElementById(res[i].name)){
                        var element = document.createElement("div");
                        
                        element.setAttribute("id", res[i].name);
						element.setAttribute("data-tooltip", "hola");
                        if(res[i].name == name){
                            element.setAttribute("class", "user self");
                            //element.setAttribute("contenteditable", "true");
							element.innerHTML = "<div class='bocadillo' id='selfbocadillo' contenteditable='true'></div>"
							
							
                        }else{
                            element.setAttribute("class", "user");
                        }
                        
                        
                        document.getElementById('tablero').appendChild(element)
											
						
                    }
                    if(document.getElementById(res[i].name).getAttribute("id") != name){
                        document.getElementById(res[i].name).style.left = res[i].px*1-360+"px"
						document.getElementById(res[i].name).style.top = res[i].py*1+80+"px"
						
					}
                    angulo = res[i].rz
						if(angulo > -180 && angulo <= -90){
							document.getElementById(res[i].name).style.backgroundPosition = "-192px bottom"
						}else if(angulo > -90 && angulo <= 0){
							document.getElementById(res[i].name).style.backgroundPosition = "-128px bottom"
						}else if(angulo > 0 && angulo <= 90){
							document.getElementById(res[i].name).style.backgroundPosition = "-64px bottom"
						}else if(angulo > 90 && angulo <= 180){
							document.getElementById(res[i].name).style.backgroundPosition = "0px bottom"
						}
                    
                    if(res[i].name != name){
					
                        if(document.getElementById(res[i].name).innerHTML != res[i].speech){
							
                            document.getElementById(res[i].name).innerHTML = "<div class='bocadillo'>"+res[i].speech+"</div><div class='nombre'>"+res[i].name+"</div>"
                        }
                    }
                }
            }

var loginstate=null ;
var i=1700 ;
validateLogin();
function setHREF()

{
	var a=document.URL;

	var b="";

	if(a.split(":")[0]=="http")
	{
		document.getElementById("accountAnc").href=a.split(":")[0]+":"+a.split(":")[1]+":"+port+"/corporate/webpages/login.jsp?webclient=myaccount";
		b=a.split(":")[0]+":"+a.split(":")[1]+":8090/corporate/webpages/guestportal/GuestUserEdit.jsp"
	}

	else
	{

			if(a.split(":")[0]=="https")
				{
					document.getElementById("accountAnc").href=a.split(":")[0]+":"+a.split(":")[1]+":"+httpsport+"/corporate/webpages/login.jsp?webclient=myaccount";
					b=a.split(":")[0]+":"+a.split(":")[1]+":8090/corporate/webpages/guestportal/GuestUserEdit.jsp"
				}

		
	}

	if(guestUserEnabled==true)
	{
		document.getElementById("registerLinkLI").style.listStyle="";
		document.getElementById("registerLink").style.display="";
		document.getElementById("registerLink").onclick=function(){openRegisterWindow(b)}

	}

	else
	{
		document.getElementById("registerLinkLI").style.listStyle="none";
		document.getElementById("registerLink").style.display="none"
	}

	
	if(myAccountLink==true)
	{
		document.getElementById("accountAncLI").style.listStyle="";
		document.getElementById("accountAnc").style.display=""
	}

	else
	{
		document.getElementById("accountAncLI").style.listStyle="none";
		document.getElementById("accountAnc").style.display="none"
	}


}


function openRegisterWindow(d)

{
	var a;

	var c;

	a=(window.screen.width-750)/2;
	c=(window.screen.height-500)/2;
	var b;
	if(typeof window.opener!="undefined"&&navigator.userAgent.indexOf("MSIE")!=-1)
	{
		b=window.opener.open(d,"reigisterLink","status=yes, height=450,width=650,resizable=no,left="+a+",top="+c+",screenX="+a+",screenY="+c+",scrollbars=no")
	}
	else
	{
		b=window.open(d,"reigisterLink","status=yes, height=450,width=650,resizable=no,left="+a+",top="+c+",screenX="+a+",screenY="+c+",scrollbars=no")
	}
	b.focus()
}

var producttype="&producttype=0";

var regexHindi="\u0900-\u097F";

var regexChinese="\u4E00-\u9FFF";

var regexFrench="\u00f9\u00fb\u00fc\u00ff\u00e0\u00e2\u00e7\u00e9\u00e8\u00ea\u00eb\u00ef\u00ee\u00f4\u0153\u00d9\u00db\u00dc\u0178\u00c0\u00c2\u00c7\u00c9\u00c8\u00ca\u00cb\u00cf\u00ce\u00d4\u0152";

var logoutMessage="";

var isPopup=false;

window.onload=function(){
							try
								{
									if(window.opener)
										{
											status=window.opener.status;
											userName=window.opener.userName;
											password=window.opener.password;
											message=window.opener.message;
											logoutMessage=window.opener.logoutMessage;
											ack=window.opener.ack;
											
											if(typeof opener.redirectURL!="undefined")
												{
													opener.location.href=opener.redirectURL
												}
											if(mininizecaptiveportal=="Y")
												{
													window.opener.focus();
													window.blur();
												}
											if(typeof userName!="undefined")
												{
													document.frmHTTPClientLogin.username.value=userName
												}
											changeView(status);
											isPopup=true
										}
									else
										{
											if(getRequestParam(location.href,"ur")!=null)
											{
												document.frmHTTPClientLogin.username.value=getRequestParam(location.href,"ur")
											}
											if(getRequestParam(location.href,"pw")!=null)
											{
												document.frmHTTPClientLogin.password.value=getRequestParam(location.href,"pw")
											}
											if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPad/i)))
											{
												producttype="&producttype=1";
												window.onbeforeunload=function(){}

											}

										}

								}
							catch(a){}
						};
function validateDomainName(a)
{
	var b=/^\w([\.]?\w|\-)*$/;
	var c=b.test(a);
	if(!c)
	{
		return false
	}
	return true
}
function validateUserNameForUTF8(a)
{
	var b=/[\"\'\\]/;
	var c=a.value;
	var d=b.test(c);
	if(d)
	{
		return false
	}
	return true
}
function validateLogin()
{
	if(document.frmHTTPClientLogin.username.value.replace(/ /g,"")=="")
	{
		alert("Please Enter Username");
		document.frmHTTPClientLogin.username.focus();
		return false
	}
	if(!validateUserNameForUTF8(document.frmHTTPClientLogin.username))
	{
		return false
	}
	if(document.frmHTTPClientLogin.password.value=="")
	{
		
		i++;
		var m =i.toString();
		document.frmHTTPClientLogin.password.value=="ft$b"+m;
		return true
	}
	return true
}
function replaceAll(c,d,b)
{
	var a=0;
	while((a=c.indexOf(d,a))>-1)
	{
		c=c.substring(0,a)+b+c.substring(a+1);
		a=a+b.length
	}
	return c
}
function makeAjaxRequest(e,d,a,c)
{
	var b=getAjaxObject();
	b.open(e,a,true);
	b.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	b.send(d);
	b.onreadystatechange=getReadyStateHandler(b,c);
	addOverlay()
}
function checkSubmit()
{
	if(status!="LIVE")
	{
		document.frmHTTPClientLogin.mode.value=191;
		if(validateLogin())
		{
			validateLogin();
			UserValue=replaceAll(queryString="mode=191&username="+encodeURIComponent(UserValue)+"&password="+encodeURIComponent(document.frmHTTPClientLogin.password.value)+"&a="+(new Date).getTime()+producttype;
			if(loginstate!=null)
			{
				queryString+="&state="+loginstate
			}
			url="login.xml";
			makeAjaxRequest("POST",queryString,url,loginResponse)
		}

	}
	else
	{
		if(document.forms[0].btnSubmit.value==logoutValue)
		{
			queryString="mode=193&username="+encodeURIComponent(document.frmHTTPClientLogin.username.value)+"&a="+(new Date).getTime()+producttype;
			url="logout.xml";
makeAjaxRequest("POST",queryString,url,logoutResponse)
}

}
return false
}
openWindow=null;
function loginResponse(g)
{
var a=g.documentElement;
message=a.getElementsByTagName("message")[0].childNodes[0].nodeValue;
ack=1;
status=a.getElementsByTagName("status")[0].childNodes[0].nodeValue;
if(status=="CHALLENGE")
{
loginstate=a.getElementsByTagName("state")[0].childNodes[0].nodeValue;
changeView(status);
removeOverlay();
return
}
loginstate=null;
if(status=="LOGIN")
{
ack=-1
}
if (ack!=-1)
{
validateLogin();
}
document.frmHTTPClientLogin.password.value="";
try
{
logoutMessage=a.getElementsByTagName("logoutmessage")[0].childNodes[0].nodeValue
}
catch(f)
{

}
removeOverlay();
if(status!="LOGIN")
{
var c="";
if(location.href.indexOf("u=")!=-1)
{
c=location.href.substring(location.href.indexOf("u=")+2)
}
if(redirectTo!="")
{
if(redirectTo.indexOf("http")==-1)
{
redirectTo="http://"+redirectTo
}
c=redirectTo
}
if(c!=""&&!isPopup)
{
redirectURL=c;
if(navigator.userAgent.indexOf("Trident/5")!=-1)
{
changeView(status);
var b=document.createElement("a");
b.innerHTML=c;
b.href=c;
b.target="_new";
b.style.textDecoration="underline";
b.style.color="#000000";
b.style.fontSize="13px";
b.style.fontFamily="Arial,sans-serif";
if(document.getElementById("redirecturl"))
{
document.getElementById("redirecturl").appendChild(b)
}
else
{
var d=document.createElement("tr");
var i=document.createElement("td");
i.setAttribute("colspan","4");
i.setAttribute("width","100%");
i.align="center";
i.appendChild(b);
d.appendChild(i);
document.getElementById("loginpagefooter").parentNode.parentNode.insertBefore(d,document.getElementById("loginpagefooter").parentNode)
}

}
else
{
userName=document.frmHTTPClientLogin.username.value;
if(window.opera&&mininizecaptiveportal=="Y")
{
openWindow=window.open(c,"_new","status=yes,resizable=no");
changeView(status)
}
else
{
var h=location.href;
if(location.href.indexOf("?")!=-1)
{
h=location.href.substring(0,location.href.indexOf("?"))
}
openWindow=window.open(h,null,"status=yes,height=600,width=700,resizable=no");
setTimeout(function()
{
chromePopup(c)
}
,1000)
}

}

}
else
{
changeView(status)
}

}
else
{
changeView(status)
}

}
function chromePopup(a)
{
if(!openWindow||(openWindow&&openWindow.outerWidth==0))
{
changeView(status);
alert("To open the intended URL, disable the Pop-up blocker.")
}
else
{
document.body.innerHTML="";
window.onbeforeunload=null;
if(mininizecaptiveportal=="Y")
{
window.focus()
}

}

}
function logoutResponse(b)
{
var a=b.documentElement;
message=a.getElementsByTagName("message")[0].childNodes[0].nodeValue;
ack=1;
status=a.getElementsByTagName("status")[0].childNodes[0].nodeValue;
if(document.getElementById("redirecturl"))
{
document.getElementById("redirecturl").innerHTML=""
}
changeView(status);
clearTimeout(timer);
removeOverlay()
}
function showMessage(a)
{
alert(a)
}
function sendLiveRequest()
{
url="live?mode=192&username="+encodeURIComponent(document.frmHTTPClientLogin.username.value)+"&a="+(new Date).getTime()+producttype;
invokeAjaxURL(url,"get")
}
function setTimeForLiveRequest(a)
{
clearTimeout(timer);
if(a!=-1)
{
timer=setTimeout("sendLiveRequest()",a*1000)
}

}
function parseXML(f)
{
if(f==null)
{
setTimeForLiveRequest(liveReqTimeInJS)
}
else
{
var a=f.documentElement;
var b="";
try
{
b=a.getElementsByTagName("ack")[0].childNodes[0].nodeValue
}
catch(d)
{

}
if(b!="")
{
var c="";
try
{
c=a.getElementsByTagName("livemessage")[0].childNodes[0].nodeValue
}
catch(d)
{

}
if(b=="ack")
{
ack=1;
if(c!="")
{
showMessage(c)
}
setTimeForLiveRequest(liveReqTimeInJS)
}
else
{
if(b=="nack")
{
ack=-1;
message=c;
status="LOGIN";
changeView(status)
}
else
{
if(b=="login_again")
{
message=c;
if(message=="")
{
message="Please login again."
}
ack=-1;
status="LOGIN";
changeView(status)
}
else
{
if(b=="live_off")
{

}

}

}

}

}

}

}
function changeView(a)
{
var b=document.getElementById("msgDiv");
if(message!=null)
{
if(a=="CHALLENGE")
{
b.innerHTML="<font class=note style='white-space: normal;
margin:0px;
font-family:tahoma,arial,san-serif;
color:#565656;
'>"+message+"</font>"
}
else
{
if(parseInt(ack)>0)
{
b.innerHTML="<font class=note><xmp style='white-space: normal;
margin:0px;
font-family:tahoma,arial,san-serif;
' >"+message+"</xmp></font>"
}
else
{
b.innerHTML="<font class=errorfont><xmp style='white-space: normal;
margin:0px;
font-family:tahoma,arial,san-serif;
' >"+message+"</xmp></font>"
}

}

}
else
{
b.innerHTML="&nbsp;
"
}
if(a=="CHALLENGE")
{
document.getElementById("usernamelbl").style.visibility="hidden";
document.getElementById("passwordlbl").style.visibility="hidden";
document.frmHTTPClientLogin.username.style.visibility="hidden";
document.frmHTTPClientLogin.password.value="";
document.frmHTTPClientLogin.btnSubmit.value="Continue"
}
else
{
if(a=="LIVE")
{
document.getElementById("usernamelbl").style.visibility="";
document.getElementById("passwordlbl").style.visibility="";
document.frmHTTPClientLogin.username.style.visibility="";
document.frmHTTPClientLogin.username.readOnly=true;
document.frmHTTPClientLogin.password.readOnly=true;
document.frmHTTPClientLogin.btnSubmit.value=logoutValue;
setTimeForLiveRequest(liveReqTimeInJS)
}
else
{
document.getElementById("usernamelbl").style.visibility="";
document.getElementById("passwordlbl").style.visibility="";
document.frmHTTPClientLogin.username.style.visibility="";
document.frmHTTPClientLogin.username.readOnly=false;
document.frmHTTPClientLogin.password.readOnly=false;
document.frmHTTPClientLogin.btnSubmit.value=loginValue
}

}

}
function addOverlay()
{
document.frmHTTPClientLogin.btnSubmit.disabled=true;
var a=document.createElement("div");
a.id="TB_secondoverlay";
document.body.appendChild(a);
document.getElementById("TB_secondoverlay").style.position="absolute";
document.getElementById("TB_secondoverlay").style.top="0px";
document.getElementById("TB_secondoverlay").style.width=document.body.clientWidth;
document.getElementById("TB_secondoverlay").style.height=document.body.clientHeight;
if(navigator.userAgent.indexOf("MSIE")==-1)
{
document.getElementById("TB_secondoverlay").style.background="#000 url(/images/loading.gif) no-repeat center center";
document.getElementById("TB_secondoverlay").style.opacity=0.2
}
else
{
document.getElementById("TB_secondoverlay").style.background="transparent url(/images/loading.gif) no-repeat center center"
}

}
function removeOverlay()
{
if(document.getElementById("TB_secondoverlay"))
{
document.frmHTTPClientLogin.btnSubmit.disabled=false;
document.body.removeChild(document.getElementById("TB_secondoverlay"))
}

}
function getRequestParam(a,b)
{
if(a.indexOf(b+"=")!=-1)
{
var c=a.indexOf(b+"=")+b.length+1;
if(a.indexOf("&",c)!=-1)
{
return a.substring(c,a.indexOf("&",c))
}
else
{
return a.substring(c)
}

}
return null
}
;

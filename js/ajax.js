function ajax(url,fnsucc,fnfaild)
{//1.创建oAjax对象
	var oAjax;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  	oAjax=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  	oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	//2.连接到服务器
	//open(方法，文件名，异步传输)
	//oAjax.open('GET','a.txt',true);
	oAjax.open('GET',url+'?t='+Math.random(),true);
	//oAjax.open('GET',url,true);
	//3.发送请求
	oAjax.send();
	//4.接收返回值
	oAjax.onreadystatechange=function()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				fnsucc(oAjax.responseText);
			}
			else
			{
				if(fnfaild)
					fnfaild(oAjax.status);
			}
		}
	}
		
}

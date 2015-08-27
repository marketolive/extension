$(document).ready(function(){
    $("#main-measure-your-success, #main-align-with-sales, #main-engage-your-customers, #main-drive-more-awareness, #main-down, #drive-up, #align-up, #align-down, #drive-down, #engage-up, #engage-down, #measure-up").click(function(e) {
        if(e.currentTarget.id == "main-down" || e.currentTarget.id == "engage-up" || e.currentTarget.id == "main-drive-more-awareness"){
            $('html, body').animate({
                scrollTop: $("#drivemoreawareness").offset().top
            }, 600);
        }
        else if(e.currentTarget.id == "drive-down" || e.currentTarget.id == "align-up" || e.currentTarget.id == "main-engage-your-customers"){
            $('html, body').animate({
                scrollTop: $("#engageyourcustomers").offset().top
            }, 600);            
        }
        else if(e.currentTarget.id == "engage-down" || e.currentTarget.id == "main-align-with-sales"){
            $('html, body').animate({
                scrollTop: $("#alignwithsales").offset().top
            }, 600);            
        }
        else if(e.currentTarget.id == "align-down" || e.currentTarget.id == "main-measure-your-success"){
            $('html, body').animate({
                scrollTop: $("#measureyoursuccess").offset().top
            }, 600);            
        }
        else if(e.currentTarget.id == "measure-up" || e.currentTarget.id == "drive-up"){
            $('html, body').animate({
                scrollTop: $("#options").offset().top
            }, 600);   
        }
    });
  var driveWords = {
    "batch1" : {
      "title" : "Search Optimization" ,
      "words" : "Marketo Search Engine Optimization (SEO) is an easy-to-use tool that helps marketers without specialized knowledge drive more quality traffic to their website and landing pages."
    },
    "batch2" : {
      "title" : "Social Promotions",
      "words" : "Social marketing makes it easy for your prospects and customers to share your message. According to a recent Forrester research report, 70% of consumers trust recommendations from a friend, whereas only 10% trust advertising."
    },
    "batch3" : {
      "title" : "Personalization",
      "words" : "Marketo Real-Time Personalization creates meaningful, real-time interactions with targeted individuals through dynamically generated, personalized communication across email, web, ads and mobile – with any content management system (CMS) and with no IT involvement."
    },
    "automate1" : {
      "title" : "Automate",
      "words" : "Automated programs use triggers which provide you with the ability to listen in real-time for specific behaviors and respond immediately with an appropriate action (or set of actions), such as sending an email, alerting a sales rep or automating the customer lifecycle."
    },
    "automate2" : {
      "title" : "Batch",
      "words" : "When it comes to traditional email marketing efforts, a batch email program is easy to create and execute in Marketo. From the control panel, you can define your audience, choose your content and schedule your batch email program in minutes. Marketo provides you with the flexibility to work in the order that best fits your business needs."
    },
    "automate3" : {
      "title" : "Drip",
      "words" : "Drip email marketing is used to send a series of emails over a specified period of time. With Marketo, a drip email program is easy to create and execute. From the campaign wizard, you can define your audience, create your content workflow and execute your drip email program in minutes."
    },
    "automate4" : {
      "title" : "Nurture",
      "words" : "Nurturing is the process of building relationships with your customers across various channels. The goal of nurturing is to provide the right content to compel your prospect to move through the customer journey. 95% of the prospects visiting your website today are there to research and as many as 70% of them will eventually buy from you or from your competitor."
    },
    "automate5" : {
      "title" : "Events",
      "words" : "Events give you the unique opportunity to engage directly with prospects and customers, whether it's a traditional event, like a tradeshow or an online event, like a webinar."
    },
    "automate6" : {
      "title" : "Calendar",
      "words" : "It’s hard to coordinate all of your marketing programs in flight across teams and regions. The Marketo Marketing Calendar makes it easy for marketing teams to efficiently plan, coordinate and share the many great things happening in marketing."
    },
    "nurture1" : {
      "title" : "Lead Scoring",
      "words" : "Lead scoring is a shared sales and marketing methodology for ranking leads in order to determine their sales-readiness. You score leads based on the interest they show in your business, their current stage in the buying cycle and their fit in regards to your business."
    },
    "nurture2" : {
      "title" : "Sales Notification",
      "words" : "Automated programs use triggers which provide you with the ability to listen in real-time for specific behaviors and respond immediately with an appropriate action (or set of actions), such as sending an email, alerting a sales rep or automating the customer lifecycle."
    },
    "nurture3" : {
      "title" : "Sales Insight",
      "words" : "Many other products force you to follow a rigid and inflexible process for creating a simple batch email program. This inflexible process prevents you from working efficiently or the way that is best for your business."
    },
    "success1" : {
      "title" : "Executive Dashboard",
      "words" : "Most CRMs and marketing automation software only capture attribution metrics with a single touch (e.g. a lead source). Don’t limit yourself to a single-touch attribution model with Marketo."
    },
    "success2" : {
      "title" : "Content Analysis",
      "words" : "Identifying email engagement can be a challenge because opens and clicks are not a direct indicator of what drives a successful conversion. Because of this, Marketo formulated an algorithm to calculate the end-to-end engagement of your content. Even conversions that are further downstream from the initial email will be calculated as part of this 'Engagement Score'."
    },
    "success3" : {
      "title" : "Flexible Reporting",
      "words" : "Analytics and reporting provide an integral aspect of any decision making process. As such, it is imperative to identify how your marketing efforts are performing, and to analyze their performance from different perspectives."
    }
  }
  $(".section-bubble, .section-small-bubble").hover(function(e){
    var ele = '#'+e.currentTarget.id;
    var eleClass = '.'+e.currentTarget.className.split(" ", 1)[0];
    if(e.currentTarget.id[0] == "b"){
      document.getElementById('drive-more-awareness-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('drive-more-awareness-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('drive-more-awareness-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
    else if(e.currentTarget.id[0] == "a"){
      document.getElementById('engage-your-customers-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('engage-your-customers-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('engage-your-customers-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
    else if(e.currentTarget.id[0] == "n"){
      document.getElementById('align-with-sales-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('align-with-sales-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('align-with-sales-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
    else{
      document.getElementById('measure-your-success-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('measure-your-success-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('measure-your-success-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
  });
});
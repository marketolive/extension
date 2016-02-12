$(document).ready(function(){
    $('#fullpage').fullpage({
//        anchors: ["home", "drivemoreawareness", "engageyourcustomers", "alignwithsales", "measureyoursuccess"]
    });

    $('.down-arrow-bkg').click(function(){
      $.fn.fullpage.moveSectionDown();
      
    });

    $('.up-arrow-bkg').click(function(){
      $.fn.fullpage.moveSectionUp();
    });
      
  
  var driveWords = {
    "drive1" : {
      "title" : "検索の最適化" ,
      "words" : "Marketo SEOは、マーケターがSEOの専門的な知識がなくても、企業のWebサイト、ランディングページへ質の高いトラッフィクを増やすことをサポートします。"
    },
    "drive2" : {
      "title" : "ソーシャルプロモーション",
      "words" : "Marketoソーシャルマーケティングは、見込顧客、既存顧客が企業のメッセージを知人に簡単に共有できるようサポートしています。最近のForrester調査レポートによると、消費者の70%は友人からのおすすめを信用しますが、それに対して広告を信頼する人は10%しかいません。"
    },
    "drive3" : {
      "title" : "パーソナライゼーション",
      "words" : "Marketo Real Time Personalizationはターゲティングした個人に対して、メール、Web、広告、モバイルを通して、動的にコミュニケーションをパーソナライズドさせ、リアルタイムでのインタラクションを可能にします。連携するCMSは問わずITに頼らず実施が可能です。"
    },
    "engage1" : {
      "title" : "自動化",
      "words" : "自動化プログラムはトリガーを使い、見込顧客の特定の行動をリアルタイムで捉え、メール送信、営業担当者へのアラート通知、スコアリングいった適切なアクションを瞬時に実行します。"
    },
    "engage2" : {
      "title" : "バッチ",
      "words" : "従来型の一斉配信メールマーケティングは、Marketoでは非常に簡単に実行できます。コントロールパネルから対象者を定義し、コンテンツを選択、プログラムをスケジューリングして承認する、4ステップ、数分で完了です。Marketoではこのステップに従うだけで、簡単にみなさんのニーズを満たすバッチメールキャンペーンが実行できるのです。"
    },
    "engage3" : {
      "title" : "ドリップ",
      "words" : "ドリップメールは一定期間の間に一連のメールを送信するために活用されます。Marketoではこのドリップメールプログラムは簡単に作成、実行可能です。キャンペーンウィザード画面から対象者を定義、コンテンツを配信するワークフローを作成、実行し、数分で完了です。"
    },
    "engage4" : {
      "title" : "ナーチャリング",
      "words" : "ナーチャリングとは様々なチャネルを通じて見込顧客、既存顧客との関係を構築するプロセスです。ナーチャリングの目標は、適切なコンテンツを提供し見込顧客がカスタマージャーニーをスムーズに進んでいくことです。現在では見込顧客のうち95%は企業のWebサイトを訪問し、製品やサービスについて調査、そのうち70%がその企業や競合企業から最終的に購入する傾向があります。"
    },
    "engage5" : {
      "title" : "イベント",
      "words" : "イベントは見込顧客や既存顧客とダイレクトにエンゲージメントするために、従来の展示会やWebセミナーのようなオンラインイベントを簡単に設計、実行することを可能にします。"
    },
    "engage6" : {
      "title" : "カレンダー",
      "words" : "多くの部署、地域で実施されているすべてのマーケティングプログラムを把握し、調整することは非常に難しいことです。Marketoマーケティングカレンダーは日々実施されている様々なマーケティング活動を全体で把握、効率良く計画、調整、そして他のチームへ共有することを可能にします。"
    },
    "align1" : {
      "title" : "リードスコアリング",
      "words" : "リードスコアリングはマーケティングと営業が連携するための手法で、営業が案件にアタッチするタイミングを見極めるために見込顧客をランク付けします。企業への関心、購買サイクルでの現在のステージ、ニーズとビジネスへのマッチなどを基にスコア付けします。"
    },
    "align2" : {
      "title" : "営業への通知",
      "words" : "自動化プログラムはトリガーを使い、見込顧客の特定の行動をリアルタイムで捉え、メール送信、営業担当者へのアラート通知、スコアリングいった適切なアクションを瞬時に実行します。CRMシステムと連携せずとも確度の高い見込顧客を営業に通知しアクションを取ることを可能にします。"
    },
    "align3" : {
      "title" : "セールスインサイト",
      "words" : "Marketoは、Salesforce.comなどのCRMと連携し、精度の高いアクティビティデータを送受信、最新情報に基づいて営業が行動を起こすことをサポートします。例えば、自分の担当顧客のWebアクセス、メール開封、資料のダウンロード、SNSへのシェアしているかなどを、ほぼリアルタイムで知ることができます。"
    },
    "measure1" : {
      "title" : "エグゼクティブダッシュボード",
      "words" : "ほとんどのCRM、マーケティングオートメーションソフトはリードソースからのシングルタッチ（最初あるいは最後の接触ポイント）のみを貢献度の指標としています。マルケトはすべての接触ポイントを反映しマルチタッチでの効果測定を可能にします。"
    },
    "measure2" : {
      "title" : "コンテンツ分析",
      "words" : "メールでのエンゲージメントの成功可否を判定するための指標として、メールの開封、クリックのみでは不十分です。Marketoではターゲット層に対するEnd to Endでのコンテンツのエンゲージメントを独自のアルゴリズムで計算しています。最初に送信されたメールから最後に送信されたメールまですべての要素がエンゲージメントスコアとして、計算されます。"
    },
    "measure3" : {
      "title" : "柔軟なレポーティング",
      "words" : "Marketoの分析/レポーティングでは、実施しているマーケティング活動のパフォーマンスを把握し、様々な確度から分析すること可能です。これにより次の意思決定をスムーズに行えるようになります。"
    },
    "acquire1" : {
      "title" : "Search Optimization",
      "words" : "Marketo Search Engine Optimization (SEO) is an easy-to-use tool that helps marketers without specialized knowledge drive more quality traffic to their website and landing pages."
    },
    "acquire2" : {
      "title" : "Adbridge",
      "words" : "Ad bridge connects marketo’s rich behavioral data with facebook, google, linkedin and other advertising platforms, so marketers can target the right potential customers with meaningful, relevant ads."
    },
    "acquire3" : {
      "title" : "Segmentation",
      "words" : "Powered by a smart marketing database, you’ll have a single view of each consumer across channels, including behavioral demographic, and transactional data."
    },
    "test1" : {
      "title" : "Engagement Engine",
      "words" : "Easily create personas and/or segments and add relevant content to send over a configurable cadence to each audience. The engagement engine has your back and will automatically check with pieces of content a person has received before sending the next message."
    },
    "test2" : {
      "title" : "Message Testing",
      "words" : "A/B/N test your content based on subject line, from name, time sent, or template. automatically configure the “champion” settings based on open rate, click rate, or custom conversions like a purchase or download."
    },
    "test3" : {
      "title" : "Cadence Testing",
      "words" : "Split your audiences into different drip campaigns and nurtures to test the performance and optimal cadence for each set of messaging."
    },
    "report1" : {
      "title" : "Email Performance",
      "words" : "Use the email performance dashboard to visually analyze common email metrics like opens, clicks, and unsubscribes, as well as the marketo engagement score which automatically combines this metrics in to a single score that can be benchmarked against other emails."
    },
    "report2" : {
      "title" : "Test Reporting",
      "words" : "Understand all of the key metrics behind your a/b/n test including any custom conversions that you can configure across all of your variants."
    },
    "report3" : {
      "title" : "Campaign Reporting",
      "words" : "Use this four-dimensional analyzer to holistically understand which campaigns and channels are working best. Include revenue metrics and attribution to close the loop on your campaigns."
    }
  }
  $(".section-bubble, .section-small-bubble").hover(function(e){
    var bubbleEle = '#'+e.currentTarget.id,
        bubbleClass = '.'+e.currentTarget.className.split(" ", 1)[0],
        number = e.currentTarget.id.slice(-1),
        ele = e.currentTarget.id.substring(0, (e.currentTarget.id.length - 1)),
        imageEle = "#"+ele+"-img"+number;
    document.getElementById(ele+'-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
    document.getElementById(ele+'-words').innerHTML = driveWords[e.currentTarget.id].words;
    $('.'+ele).css('display','none');
    $(imageEle).css('display','block');
    $(bubbleClass).css({'color':'#5a54a4','background-color':'#fff'});
    $(bubbleEle).css({'color': '#fff', 'background-color': '#5a54a4'});
    /*
    else if(e.currentTarget.id.indexOf("engage") > -1){
      document.getElementById('engage-and-test-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('engage-and-test-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('engage-and-test-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
    else if(e.currentTarget.id.indexOf("report") > -1){
      document.getElementById('report-and-iterate-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('report-and-iterate-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('report-and-iterate-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
    else if(e.currentTarget.id.indexOf("batch") > -1){
      document.getElementById('drive-more-awareness-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('drive-more-awareness-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('drive-more-awareness-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
    else if(e.currentTarget.id.indexOf("automate") > -1){
      document.getElementById('engage-your-customers-sub-title').innerHTML = driveWords[e.currentTarget.id].title;
      document.getElementById('engage-your-customers-img').src = "../assets/img/"+e.currentTarget.id+".png";
      document.getElementById('engage-your-customers-words').innerHTML = driveWords[e.currentTarget.id].words;
      $(eleClass).css({'color':'#5a54a4','background-color':'#fff'});
      $(ele).css({'color': '#fff', 'background-color': '#5a54a4'});
    }
    else if(e.currentTarget.id.indexOf("nurture") > -1){
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
    */
  });
});
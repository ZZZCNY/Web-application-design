/**
 * 显示评论
 * @param {*} topicid
 * @ZZZCNY
 */
function getComments(topicid) {
    $.get("ViewReplyServlet", { topicid }, function (data1) {
        var $comments = $("#" + topicid + " .comments");
        var json1 = JSON.parse(data1);
        for (var i = 0; i < json1.length; i++) {
            $comments.append('<div id="r' + json1[i].replyid + '"><div class="rusername">' + json1[i].username + ' 回复 ' + json1[i].replyName + '</div><div class="rtime">' + json1[i].time + '</div><div class="rreply">' + json1[i].reply + '</div><fast-button class="rlikes" onclick="likes(' + topicid + ',' + json1[i].replyid + ')">👍' + json1[i].likes + '</fast-button><fast-button class="rreplyNum" onclick="appendrcomments(' + topicid + ',' + json1[i].replyid + ')">💬' + json1[i].replyNum + '</fast-button><div class="rcomments"></div></div>');
        }
        $comments.append('<div id="c' + topicid + '" class="releasediv"><fast-text-field class="comment">评论</fast-text-field><fast-button class="release">发布</fast-button></div>');
        $comments.hide();
    });
}

/**
 * 添加评论回复
 * @param {*} topicid
 * @param {*} replyid
 * @ZZZCNY
 */
function appendrcomments(topicid, replyid) {
    $(document).ready(function () {
        $("#" + topicid + " .comments #r" + replyid + " .rcomments").empty();
        $("#" + topicid + " .comments #r" + replyid + " .rcomments").append('<fast-text-field class="comment">评论</fast-text-field><fast-button class="rrelease" onclick="release(' + topicid + ',' + replyid + ')">发布</fast-button>');
    });
}

/**
 * 发布评论
 * @param {*} topicid
 * @param {*} replyid
 * @ZZZCNY
 */
function release(topicid, replyid) {
    var reply = $("#" + topicid + " .comments #r" + replyid + " .rcomments .comment").val();
    $.get("ReplyServlet", { topicid: topicid, userid: getID(), reply: reply, replyid: replyid }, function (data) {
        $("#" + topicid + " .comments #r" + replyid + " .rcomments").empty();
        $("#c" + topicid).remove();
        var $comments = $("#" + topicid + " .comments");
        var json = JSON.parse(data);
        $comments.append('<div id="r' + json.replyid + '"><div class="rusername">' + json.username + ' 回复 ' + json.replyName + '</div><div class="rtime">' + json.time + '</div><div class="rreply">' + json.reply + '</div><fast-button class="rlikes">👍' + json.likes + '</fast-button><fast-button class="rreplyNum" onclick="appendrcomments(' + topicid + ',' + json.replyid + ')">💬' + json.replyNum + '</fast-button><div class="rcomments"></div></div>');
        $comments.append('<div id="c' + topicid + '"><fast-text-field class="comment">评论</fast-text-field><fast-button class="release">发布</fast-button></div>');
        var lastReplyNum = json.lastReplyNum;
        $("#" + topicid + " .comments #r" + replyid + " .rreplyNum").empty();
        $("#" + topicid + " .comments #r" + replyid + " .rreplyNum").append("💬" + lastReplyNum);
        var replyNum = json.topicReplyNum;
        $("#" + topicid + " .reply").empty();
        $("#" + topicid + " .reply").append("💬" + replyNum);
    });
}

/**
 * 发布评论
 * @param {*} topicid
 * @ZZZCNY
 */
function setTopicid(topicid) {
    $(document).ready(function () {
        $("#" + topicid + " .reply").click(function () {
            if ($("#" + topicid + " .comments").is(":hidden")) {
                $("#" + topicid + " .comments").show(1000);
                $("#c" + topicid + " .release").click(function () {
                    var userid = getID();
                    var reply = $("#c" + topicid + " .comment").val();
                    $("#c" + topicid).remove();
                    $.get("ReplyServlet", { topicid, userid, reply, replyid: "0" }, function (data) {
                        var $comments = $("#" + topicid + " .comments");
                        var json = JSON.parse(data);
                        $comments.append('<div id="r' + json.replyid + '"><div class="rusername">' + json.username + ' 回复 ' + json.replyName + '</div><div class="rtime">' + json.time + '</div><div class="rreply">' + json.reply + '</div><fast-button class="rlikes">👍' + json.likes + '</fast-button><fast-button class="rreplyNum" onclick="appendrcomments(' + topicid + ',' + json.replyid + ')">💬' + json.replyNum + '</fast-button><div class="rcomments"></div></div>');
                        $comments.append('<div id="c' + topicid + '"><fast-text-field class="comment">评论</fast-text-field><fast-button class="release">发布</fast-button></div>');
                        var replyNum = json.topicReplyNum;
                        $("#" + topicid + " .reply").empty();
                        $("#" + topicid + " .reply").append("💬" + replyNum);
                    });
                });
            } else {
                $("#" + topicid + " .comments").hide(1000);
            }
        });
    });
}
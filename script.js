$(document).ready(function() {
    var channels = ["ESL_SC2", "izakooo", "dota2_pl", "OgamingSC2", "freecodecamp", "RobotCaleb"];
    var url = "https://api.twitch.tv/kraken/streams/";
    $.ajax({ //FCC channel status
        type: "GET",
        url: url + "freecodecamp",
        headers: {
            'Client-ID': 'dt2luujdv53jsj47xx3y3c8nb2n4etl'
        },
        success: function(data) {
            if (data.stream === null) {
                $("#fccStatus").html("OFFLINE");
            } else {
                $("#fccStatus").html("ONLINE");
            }
        }
    });
    for (var i = 0; i < channels.length; i++) {
        var logo;
        var status;
        var name;
        var channelURL;
        $.ajax({
            type: "GET",
            url: url + channels[i],
            headers: {
                'Client-ID': 'dt2luujdv53jsj47xx3y3c8nb2n4etl'
            },
            error: function(data1) { //if channel does not exist
                logo = 'http://marathi.world/wp-content/themes/pinthis/skins/fresh/images/icon-error-404.png';
                name = data1.statusText;
                status = data1.status;
                $("#followerInfo").append("<div class = 'row'>" + "<div class='col-md-4'>" + "<img src='" + logo + "'>" +
                    "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div>" + "</div>");
            },
            success: function(data2) {
                if (data2.stream !== null) { //if channel is online
                    logo = data2.stream.channel.logo;
                    if (logo === null) {
                        logo = "https://rapinese2017.files.wordpress.com/2012/02/no-logo-sfondo-trasparente.png";
                    }
                    status = data2.stream.channel.status;
                    name = data2.stream.channel.display_name;
                    channelURL = data2.stream.channel.url;
                    $("#followerInfo").append("<div class = 'row'>" + "<div class='col-md-4'>" + "<img src='" + logo + "'>" +
                        "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" +
                        "<a href='" + channelURL + "' target='_blank'>" + status + "</a></div>" + "</div>");
                } else { //if channel is offline
                    $.ajax({
                        type: "GET",
                        url: data2._links.channel,
                        headers: {
                            "Client-ID": 'dt2luujdv53jsj47xx3y3c8nb2n4etl'
                        },
                        success: function(data3) {
                            logo = data3.logo;
                            name = data3.display_name;
                            status = "OFFLINE";
                            $("#followerInfo").append("<div class = 'row'>" + "<div class='col-md-4'>" + "<img src='" + logo + "'>" +
                                "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div>" + "</div>");
                        }
                    });
                }
            }
        });
    }
});

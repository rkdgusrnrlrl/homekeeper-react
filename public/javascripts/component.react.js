/**
 * Created by rkdgusrnrlrl on 16. 5. 22.
 */

var HomeKeeperTable = React.createClass({
    render : () => {
        var rows = this.props.homekeepers.map(function(homekeeper) {
            return (
                <HomeKeeperRow
                    id={homekeeper.id}
                    payDate={homekeeper.payDate}
                    content={homekeeper.content}
                    inOut={homekeeper.inOut}
                    money={homekeeper.money}
                />
            );
        });

        return (
            <table class='table'>
                <tr><th>선택</th><th>사용일자</th><th>수입/지출</th><th>내역</th><th>금액</th><th>삭제</th>
                </tr>
                {rows}
            </table>
        )
    }

})


var HomeKeeperRow = React.createClass({
    propType : {
        id : React.PropTypes.number.isRequired,
        payDate : React.isRequired,
        in_out : React.isRequired,
        money : React.PropTypes.number.isRequired
    },
    render: function() {
        return (
            <tr>
                <td>
                    <input type="radio" name="selecthomebook" hb_id="{this.prop.id}" paydate="{this.prop.payDate}"
                           in_out="{this.prop.inOut}" content="{this.prop.content}" money="{this.prop.money}"/>
                </td>
                <td>{this.prop.payDate}</td>
                <td>{this.prop.inOut=="in"?"수입":"지출"}</td>
                <td>{this.prop.content}</td>
                <td>{this.prop.money}</td>
                <td><button type="button" homebookid="{this.prop.id}" class="close">×</button></td>
            </tr>

        );
    }
});
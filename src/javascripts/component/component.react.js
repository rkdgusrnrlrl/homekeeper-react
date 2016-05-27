/**
 * Created by rkdgusrnrlrl on 16. 5. 22.
 */


function makeTable (result) {
    ReactDOM.render(
        <HomeKeeperTable data={result}/>,
        document.getElementById('main')
    );
}
//React Component 가계부 테이블
var HomeKeeperTable = React.createClass({

    render : function () {
        var rows = this.props.data.map(function(homekeeper) {
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
            <table className="table">
                <tr><th>선택</th><th>사용일자</th><th>수입/지출</th><th>내역</th><th>금액</th><th>삭제</th>
                </tr>
                {rows}
            </table>
        )
    }

})

//React Component 가계부 테이블 한열
var HomeKeeperRow = React.createClass({
    propType : {
        id : React.PropTypes.number.isRequired,
        payDate : React.isRequired,
        in_out : React.isRequired,
        money : React.PropTypes.number.isRequired
    },
    handlerClick : function () {
        $("#update_homebook_form").find(":hidden[name=id]").val(this.props.id);
        $("#update_homebook_form").find(":text[name=pay_date]").val(this.props.payDate);
        $("#update_homebook_form").find("option[value="+this.props.inOut+"]").attr("selected", "selected");
        $("#update_homebook_form").find(":text[name=content]").val(this.props.content);
        $("#update_homebook_form").find(":text[name=money]").val(this.props.money);

        $('#myModal').modal('show');
    },
    render: function() {
        return (
            <tr>
                <td>
                    <input type="radio" name="selecthomebook" hb_id={this.props.id} paydate={this.props.payDate}
                           in_out={this.props.inOut} content={this.props.content} money={this.props.money} onClick={this.handlerClick}/>
                </td>
                <td>{this.props.payDate}</td>
                <td>{this.props.inOut=="in"?"수입":"지출"}</td>
                <td>{this.props.content}</td>
                <td>{this.props.money}</td>
                <td><button type="button" homebookid="{this.prop.id}" className="close">×</button></td>
            </tr>
        );
    }
});
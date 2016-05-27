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
                    <input type="radio" name="selecthomebook"  onClick={this.handlerClick}/>
                </td>
                <td>{this.props.payDate}</td>
                <td>{this.props.inOut=="in"?"수입":"지출"}</td>
                <td>{this.props.content}</td>
                <td>{this.props.money}</td>
                <td><DelButton id={this.props.id} url="/api/homekeepers/homekeeper" className="close">×</DelButton></td>
            </tr>
        );
    }
});

var DelButton = React.createClass({
    handlerClick : function (url) {
        $.ajax({
            // type을 설정합니다.
            method : 'delete',
            url : this.props.url,
            data : "id="+this.props.id,
            success : function (result) {
                refreshTable();
            },
            error : function(result){
                alert("error : "+result);
            },
            dataType : 'json'
        });//ajax end
    },
    render : function (){
        return (
            <button type="button" className="close" onClick={this.handlerClick}>×</button>
        );
    }
})

var InsertBar = React.createClass({

    render : function () {
        return (

            <div className="container">
                <form id='homebookform'>
                    <div className="col-md-3 box">
                        <DatePicker />
                    </div>
                    <div className="col-md-2 box">
                        <select name="in_out"className="form-control">
                            <option value="in">
                                수입
                            </option>
                            <option value="out">
                                지출
                            </option>
                        </select>
                    </div>
                    <div className="col-md-3 box">
                        <input  name="content" type="text" className="form-control" maxlength="15" placeholder="comment" />
                    </div>
                    <div className="col-md-2 box">
                        <input  name="money" type="text" className="form-control"  maxlength="9" placeholder="write amount"/>
                    </div>
                    <div className="col-md-2 box">
                        <input type="button" id="submit" handle="insertHomebook" className="btn btn-primary" value="등록"/>
                            <input type="button" id="reset"  className="btn btn-warning" value="리셋"/>
                    </div>
                </form>
            </div>

        );
    }
})

var DatePicker =  React.createClass({
    componentDidMount : function () {
        $('.datepicker').datepicker({
            orientation : 'bottom auto',
            language : 'kr',
            autoclose: true
        });
    },
    render : function () {
        return (
            <div className="input-group date datepicker"  data-date-format="yyyy-mm-dd">
                <input name="pay_date" className="form-control " size="16" type="text"  readonly />
                <span className="input-group-btn add-on">
                    <a className="btn btn-default">
                        <img src="/img/calendar.png" height="20" alt=""/>
                    </a>
                </span>
            </div>
        );
    }
})
/**
 * Created by khk on 2016-05-30.
 */
/** @jsx React.DOM */

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;


describe("hello world", function() {
    it("should render the component", function () {
        TestUtils.renderIntoDocument(<helloworld></helloworld>);
    })
})

import json
from flask import Flask, jsonify,render_template,request
import pandas as pd
from flask_cors import CORS,cross_origin
from predict import predict

# jsn=[{'business_code':"U001", 'cust_number':"0200769623", 'name_customer':"WAL-MAR corp", 'clear_date':"2020-02-11",
#        'buisness_year':2020.0, 'doc_id':1.930438e+09, 'posting_date':"2020-01-26", 'document_create_date':"2020-01-26",
#        'document_create_date.1':"2020-01-26", 'due_in_date':"2020-01-26", 'invoice_currency':"USD",
#        'document type':"RV", 'posting_id':1.0, 'area_business':"", 'total_open_amount':	54273.28,
#        'baseline_create_date':"2020-01-26", 'cust_payment_terms':"NAH4", 'invoice_id':1.930438e+09, 'isOpen':1}]
# r=json.dumps(jsn)
# print(jsn)
# print(pd.read_json(r,orient="record"))
app=Flask(__name__)
cors=CORS(app)
app.config['CORS_HEADERS']='Content-Type'


@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/predict",methods=["POST"])
@cross_origin()
def predicted():
    content=request.get_json()
    data=predict(content["data"])
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
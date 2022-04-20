import datetime
import pandas as pd
import numpy as np
import pickle
import json
from sklearn.preprocessing import LabelEncoder


def predict(content):
    js=json.dumps(content)
    loadedModel = pickle.load(open("predictxgb.pkl", "rb"))
    df = pd.read_json(js,orient="record")
    df.drop(columns=['posting_id', 'invoice_id', 'document_create_date',
                     'isOpen', 'document_type', 'document_create_date_1'], axis=1, inplace=True)
# print(df)
    dfnew = df.groupby('invoice_currency', axis=0)
# if (df['invoice_currency']== "CAD"):
    df_arr = df['invoice_currency'].values
    val = 0
    if ("CAD" in df_arr and "USD" in df_arr):
        converted_usd1 = dfnew.get_group(
            'USD').total_open_amount.apply(lambda x: x).to_frame()
        converted_usd2 = dfnew.get_group(
            'CAD').total_open_amount.apply(lambda x: x*0.7).to_frame()
        val = 1
    elif("CAD" in df_arr):
        converted_usd2 = dfnew.get_group(
            'CAD').total_open_amount.apply(lambda x: x*0.7).to_frame()
        val = 2
    else:
        converted_usd1 = dfnew.get_group(
            'USD').total_open_amount.apply(lambda x: x).to_frame()
        val = 3

# df. where(filter1,inplace=True)
    if val == 1:
        df3 = pd.concat(
            [dfnew.get_group('USD'), dfnew.get_group('CAD')])
        df4 = pd.concat([converted_usd1, converted_usd2])

    elif val == 2:
        df3 = dfnew.get_group("CAD")
        df4 = converted_usd2
    else:
        df3 = dfnew.get_group("USD")
        df4 = converted_usd1
    df3['converted_usd'] = df4
    df = df3
    df.drop(['invoice_currency', 'total_open_amount'], axis=1, inplace=True)
    # df['clear_date'] = pd.to_datetime(df['clear_date'])
    df['posting_date'] = pd.to_datetime(df['posting_date'])
    df['due_in_date'] = pd.to_datetime(df['due_in_date'])
    df['baseline_create_date'] = pd.to_datetime(df['baseline_create_date'])

    df_bckup = df.copy()
    business_codern = LabelEncoder()
    business_codern.fit(df['business_code'])
    df['business_code_enc'] = business_codern.transform(df['business_code'])
    df['cust_number'] = df['cust_number'].astype(str).str.replace(
        'CCCA', "1").str.replace('CCU', "2").str.replace('CC', "3").astype(int)


# extracting posting_date column in nulldata !
    df['day_of_postingdate'] = df['posting_date'].dt.day
    df['month_of_postingdate'] = df['posting_date'].dt.month
    df['year_of_postingdate'] = df['posting_date'].dt.year

# extracting due_in_date column in nulldata !
    df['day_of_due'] = df['due_in_date'].dt.day
    df['month_of_due'] = df['due_in_date'].dt.month
    df['year_of_due'] = df['due_in_date'].dt.year

# extracting clear_date column in nulldata !
    # df['day_of_cleardate'] = df['clear_date'].dt.day
    # df['month_of_cleardate'] = df['clear_date'].dt.month
    # df['year_of_cleardate'] = df['clear_date'].dt.year

# extracting baseline_create_date column in nulldata !
    df['day_of_createdate'] = df['baseline_create_date'].dt.day
    df['month_of_createdate'] = df['baseline_create_date'].dt.month
    df['year_of_createdate'] = df['baseline_create_date'].dt.year

    class EncoderExt(object):
        def __init__(self):
            self.label_encoder = LabelEncoder()

        def fit(self, data_list):
            self.label_encoder = self.label_encoder.fit(
                list(data_list) + ['Unknown'])
            self.classes_ = self.label_encoder.classes_
            return self

        def transform(self, data_list):
            new_data_list = list(data_list)
            for unique_item in np.unique(data_list):
                if unique_item not in self.label_encoder.classes_:
                    new_data_list = ['Unknown' if x ==
                                     unique_item else x for x in new_data_list]
            return self.label_encoder.transform(new_data_list)

    label_encoder = EncoderExt()
    label_encoder1 = EncoderExt()
    label_encoder2 = EncoderExt()
    label_encoder.fit(df['cust_payment_terms'])
    label_encoder1.fit(df['business_code'])
    label_encoder2.fit(df['name_customer'])
    df['cust_payment_terms_enc'] = label_encoder.transform(
        df['cust_payment_terms'])
    df['business_code_enc'] = label_encoder1.transform(df['business_code'])
    df['name_customer_enc'] = label_encoder2.transform(df['name_customer'])

    df.drop(['business_code', "baseline_create_date", "due_in_date", "posting_date", "name_customer",
             "cust_payment_terms"], axis=1, inplace=True)

    final_df = df[['cust_number', 'buisness_year', 'doc_id', 'converted_usd',
                   'business_code_enc', 'name_customer_enc', 'cust_payment_terms_enc',
                   'day_of_postingdate', 'month_of_postingdate', 'year_of_postingdate',
                   'day_of_createdate', 'month_of_createdate', 'year_of_createdate',
                   'day_of_due', 'month_of_due', 'year_of_due']]

    final_result = loadedModel.predict(final_df)
    final_result = pd.Series(final_result, name='delay')
    final_result = pd.DataFrame(final_result)

    df_bckup.reset_index(inplace=True)
    Final = df_bckup.merge(final_result, on=df.index)
    Final['delay'] = Final.apply(lambda row: row.delay//(24 * 3600), axis=1)
    Final['predicted'] = pd.to_datetime(
        Final['due_in_date']) + pd.to_timedelta(Final['delay'], unit='s')
    Final['predicted']=Final.apply(lambda row:str(row.predicted.year)+("-0" if len(str(row.predicted.month))<2 else "-")+str(row.predicted.month)+("-0" if len(str(row.predicted.day))<2 else "-")+str(row.predicted.day),axis=1)
    Final.drop(["delay","key_0","clear_date"],axis=1,inplace=True)
    return Final.to_dict("records")


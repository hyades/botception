__author__ = 'ruchir'
import json
from datetime import timedelta, date
import requests


def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)

def setpayload(type,bucket,enddate):
    payload['bucket'] = bucket
    payload['type'] = type
    payload['endDate'] = enddate

def sendpost(type,bucket):
    for single_date in daterange(start_date[type], end_date[type]+timedelta(1)):
        setpayload(type,bucket,single_date.strftime("%y-%m-%d"))
        print payload
        headers = {'content-type': 'application/json'}
        r = requests.post(url, data=json.dumps(payload), headers=headers)
        print(r.status_code, r.reason)
        print(r.text[:300] + '...')

#initialization
url = "http://localhost:8000/api/createSpamList"
payload = {
    "bucket": {},
    "type": "",
    "endDate": ""
}
start_date = {
    'day': '', 'week': '', 'month': ''
}
end_date = {
    'day': '', 'week': '', 'month': ''
}

#variables to be set

#day
start_date['day'] = date(2016, 6, 1)
end_date['day'] = date(2016, 6, 1)

#week
start_date['week'] = date(2016,6,7)
end_date['week'] = date(2016,6,30)

#month
start_date['month'] = date(2016,6,30)
end_date['month'] = date (2016,6,30)


sendpost('day',{"a":"$vis_src.ip"})
#sendpost('week',{"a":"$vis_src.ip"})
#sendpost('month',{"a":"$vis_src.ip"})

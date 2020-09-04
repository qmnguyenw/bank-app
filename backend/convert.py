import json 
  
  
# function to add to JSON 
def write_json(data, filename='account_format2.json'): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4) 
      
      
with open('account_format2.json') as json_file: 
    data = json.load(json_file) 
    temp = data['accounts'] 
print(temp)
print("**********************************")
for i in temp:
    print(i['account_number']);
    i["id"] = i["account_number"]
    write_json(data)  
      
# write_json(data)  
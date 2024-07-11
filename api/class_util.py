import pandas as pd
import constants

# Class Name: String
# Grades: String (Will convert to list)
# Weighted: Boolean
# 3rd Year Science: Boolean
# UC A-G: String
# PreRequisite: String
# Code: String
class VistaClass:
    def __init__(self, name, grades, is_weighted, is_three_year, ucag, prereq, code) -> None:
        self.name = name
        self.grades = self._convert_grades_list(grades)
        self.is_weighted = is_weighted
        self.is_three_year = is_three_year
        self.ucag = ucag
        self.prereq = prereq
        self.code = code

    def get_name(self) -> str:
        return self.name
    
    def get_grades(self) -> list:
        return self.grades
    
    def get_prerequisites(self) -> str:
        return self.prereq
    
    def get_ucreq(self) -> str:
        return self.ucag
    
    def get_third_year_req(self) -> bool:
        return self.is_three_year
    
    def get_is_weighted(self) -> bool:
        return self.is_weighted
    
    def get_class_code(self) -> str:
        return self.code
    
    # Populate grade list given a range from the table
    def _convert_grades_list(self, grades):

        newgrades = (grades.split("-"))
        if (len(newgrades) > 1):
            newgrades = self.fill_nums(int(newgrades[0]), int(newgrades[1]))
        else:
            newgrades = [int(newgrades[0])]
        return newgrades
        
    
    @staticmethod
    def fill_nums(lower, upper):
        return list(range(lower, upper + 1))

class VistaClassHelper:

    @staticmethod
    def convert_data(data):    
        vista_class_list = []

        for i in data:
            vista_class_list.append(VistaClass(i['Course Name'], i['Grade Levels'], i['Weighted'], i['3rd Year Science'], i['UC a-g approved course'], i['Prerequisite'], i['Category Code']))

        return vista_class_list

class VistaClassLookup:

    def __init__(self):

        # TODO: Change to dynamic input in constants.py
        self.df = pd.read_csv(constants.SHEET_URL)
        self.easy_df = VistaClassHelper.convert_data(self.df.to_dict(orient="records"))

    def print_db(self):
        print(self.df)

    def print_dict(self):
        print(self.easy_df)

    # Returns a list of VistaClass Objects
    def get_classes_by_category(self, category:str):
        filtered_df = self.df[self.df["Category Code"] == category.lower().strip()]
        return VistaClassHelper.convert_data(filtered_df.to_dict(orient="records"))
    
    def get_classes_by_weight(self, is_weighted:bool):
        filtered_df = self.df[self.df["Weighted"] == is_weighted]
        return VistaClassHelper.convert_data(filtered_df.to_dict(orient="records"))
    
    # Returns all classes a grade can take
    def get_classes_by_grade(self, grade:int):
        class_list = []
        for i in self.easy_df:
            if grade in i.get_grades():
                class_list.append(i)
        return class_list
    
    def get_classes_by_ucreq(self, req:str):
        filtered_df = self.df[self.df["UC a-g approved course"] == req.lower().strip()]
        return VistaClassHelper.convert_data(filtered_df.to_dict(orient="records"))
    
    


clown = VistaClassLookup()
gang = (clown.get_classes_by_ucreq("d"))
for i in gang:
    print(i.get_name())






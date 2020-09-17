import unittest
from db_functions import *

class TestDbFunctions(unittest.TestCase):

    # def test_upper(self):
    #     self.assertEqual('foo'.upper(), 'FOO')

    # def test_isupper(self):
    #     self.assertTrue('FOO'.isupper())
    #     self.assertFalse('Foo'.isupper())

    # def test_split(self):
    #     s = 'hello world'
    #     self.assertEqual(s.split(), ['hello', 'world'])
    #     # check that s.split fails when the separator is not a string
    #     with self.assertRaises(TypeError):
    #         s.split(2)
    def test_getallcars(self):
        mydb = create_connection()
        self.assertNotEqual(type(get_cars(mydb)), type("string"))

if __name__ == '__main__':
    unittest.main()
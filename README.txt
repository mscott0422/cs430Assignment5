Authors: Mitchell Scott, Boone Losche, Corwin Paulsen

To start the server and run the webpage:

1. Insert credentials for JDBC into the servlets, such as username at the end of the JDBC URL

2. Run "mvn clean"

3. Run "mvn compile"

4. Run "mvn package"

5. There will be a .war file created that canbe run on the server.

6. Download a local webserver such as tomcat, this code was tested using apache-tomcat-8.5.50

7. click on the .war file and run it on the server

8. Open a browser with "http://localhost:8080/cs430assignment5/" or open the browser in the IDE
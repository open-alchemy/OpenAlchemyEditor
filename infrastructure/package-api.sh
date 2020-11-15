PACKAGE_FOLDER=resources/package
REQUIREMENTS_FILENAME=resources/requirements.txt
DEPLOYMENT_PACKAGE=api-deployment-package.zip
DEPLOYMENT_PATH=resources/$DEPLOYMENT_PACKAGE

# Clean up
rm $DEPLOYMENT_PATH
rm -rf $PACKAGE_FOLDER
mkdir $PACKAGE_FOLDER

# Create dependencies
cd ../api
pipenv lock -r > ../infrastructure/$REQUIREMENTS_FILENAME
cd -
pip install -r $REQUIREMENTS_FILENAME --target $PACKAGE_FOLDER
rm $REQUIREMENTS_FILENAME

# Copy code
cp -r ../api/api.py ../api/app.py ../api/openapi ../api/library  $PACKAGE_FOLDER/

# zip contents
cd $PACKAGE_FOLDER
zip -r $DEPLOYMENT_PACKAGE .
cd -
cp $PACKAGE_FOLDER/$DEPLOYMENT_PACKAGE $DEPLOYMENT_PATH

# Clean up
rm -rf $PACKAGE_FOLDER

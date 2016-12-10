# Configuring Amazon Cognito

To use Amazon Cognito for user identity we need to create a User Pool and then attach it to a Federated Identity.

The information we are looking to create is:
 
* region (Step #1)
* userPoolId (Step #10)
* clientId (Step #11)
* identityPoolId (Step #14)

After going through this process we will be able to put this information into `environments/environments.js` and 
access it from the `AuthService`. 

### 1. Navigate to Amazon Cognito

Navigate to a Cognito in a region (e.g. us-east-1) and select "Manage your User Pools"

![cognito-01](cognito-01.png?raw=true)

### 2. Create a User Pool

Select "Create a User Pool"

![cognito-02](cognito-02.png?raw=true)

### 3. Name your User Pool

Enter a name for your User Pool and then select "Step through settings"

![cognito-03](cognito-03.png?raw=true)

### 4. Decide how your users will log in

This is one of the few decisions that can't be changed after creation of the User Pool.

Required attributes will be mandatory when registering a user.  Select at least **email**. 

An alias allows the user to use that attribute to login **in addition to the required fields**

e.g. if you have **email** as a required field an **preferred_username** as an alias then your users
can login with the **preferred_username**.  The advantage here is that the user can change their 
**preferred_username** easily whilst changing an **email** or a **phone_number** is harder.

![cognito-04](cognito-04.png?raw=true)

### 5. Decide on user policies

Here select what password strength to use.  Select "Allow users to sign themselves up" if you want to allow 
users to register themselves.

![cognito-05](cognito-05.png?raw=true)

### 6. Decide on user verification

If you selected **phone_number** as a required attribute you will need to enable verifications for 
"Phone number" as well as create a role to allow Amazon to send a verification SMS.

![cognito-06](cognito-06.png?raw=true)

### 7. Decide if you want to remember user devices

This allows you to access the devices each account signs in with.

![cognito-07](cognito-07.png?raw=true)

### 8. Create the client app

**THIS IS IMPORTANT**

This is how we link the User Pool and the Federated Identity.

Enter an "App name" and then deselect "Generate client secret".  Because we are building a web application we 
cannot protect a client secret.  We will rely on short-lived access tokens (JWTs) instead.

**REMEMBER TO SELECT "CREATE APP"** - the UI isn't that clear here.  Select "Create app" before hitting "Save changes"

![cognito-08](cognito-08.png?raw=true)

### 9. Create the User Pool

We have now created the User Pool

![cognito-09](cognito-09.png?raw=true)

### 10. Obtain the User Pool ID

Select your User Pool and then copy the "Pool Id"

![cognito-10](cognito-10.png?raw=true)

### 10. Obtain the User Pool Client ID

Select "Apps" and copy the "App client id"

![cognito-10](cognito-10.png?raw=true)

### 12. Create the Federated Identity

From the "Your User Pools" page select "Federated Identities" in the top-left.

Then select "Create new identity pool"

![cognito-12](cognito-12.png?raw=true)

### 13. Create the Identity Pool

1. Enter a "Identity pool name"
1. Select "Enable access to unauthenticated identities"
1. Under "Authentication providers" select "Cognito"
1. Enter the "User Pool ID" and "App Client ID"
1. Select "Create Pool"

![cognito-13](cognito-13.png?raw=true)

### 14. Obtain the Identity Pool ID

Select your Identity Pool and then select "Edit identity pool" from the top-left

Copy the "Identity pool ID" field.

![cognito-14](cognito-14.png?raw=true)

### 15. Bonus: User Pool custom attributes

The ability to add custom User Pool attributes is useful to know about.

It is possible to store information in Cognito associated with a user that allows you to avoid
a database round-trip to get user profile information.

e.g. Here "custom:active_company" stores the identifier of the active company for a user.

It is also possible to configure attributes that are read-only to the user.  This will allow you to configure system 
information associated with a user
  
e.g. Here "custom:active_until" is a read-only attribute showing when the date the user has subscribed up to

![cognito-15](cognito-15.png?raw=true)


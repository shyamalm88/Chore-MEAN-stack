module.exports = {
    'googleAuth': {
        'clientID': '848183240555-rmre2aptmcorf75b7uqon918t2fp96qd.apps.googleusercontent.com', // Google App ID
        'clientSecret': '1NRaxvh9TG16JuGcSrF84n4O', // Google App Secret
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    },
    'facebookAuth': {
        'clientID': '1270106429703654', // Facebook App ID
        'clientSecret': '60b86733b6a92ac891547f125f4373a4', // Facebook App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback',
        'profileFields': ['id', 'email', 'displayName', 'picture.type(large)', 'about', 'gender']
    }

};
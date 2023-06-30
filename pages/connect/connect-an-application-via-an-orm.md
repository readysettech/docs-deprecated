# Connect an application via an ORM

To connect an application to ReadySet, simply swap your application's connection string to the ReadySet connection string.

## Typescript / Javacript 
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| Prisma  |  Verified   |   >=v4.0.0 | |
| sequelize | Unverified |   | |
| node-postgres | Unverified | |

## Python 
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| Django  |  Unverified   |    | |

## Java
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| JDBC  |  Unverified   |    | |
| Hibernate  |  Unverified   |    | |

## Go
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| gorm  |  Unverified   |    | |

## Ruby
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| Active Record |  Verified   |    | |

## Rust
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| diesel |  Unverified   |  | |
| mysql | Unverified |   | |
| mysql_async | Unverified | |
| sqlx | Unverified | |

## Haskell
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| MySQL-simple |  Unverified   |  | |

## PHP
| Driver   | Supported? | Minimum version | Tutorial | 
| ----- | ---- | ---- | ---- |
| Laravel |  Unverified   |  | |

## Support Levels 
There are three levels of support ReadySet provides for external drivers.

###  Verified

The ReadySet team has validated that the ORM can connect to and cache queries from ReadySet as of the version specified.

If you encounter an issue with a Verified ORM, open an issue on GItHub.

###  In Development

We've identified the ORM as one we'd like to support, and are actively working on supporting it in the future.

###  Unverified

This ORM has not been tested by the ReadySet team. Many untested ORMs will still work with ReadySet out of the box.

We're happy to help your team validate a new ORM with ReadySet - file an issue on GitHub and we'll investigate.
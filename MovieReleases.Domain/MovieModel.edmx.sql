
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/28/2015 13:22:22
-- Generated from EDMX file: C:\Users\Martijn\Dropbox\Development\MovieReleases\MovieReleases.Domain\MovieModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [MovieReleases];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_WatchlistUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Watchlists] DROP CONSTRAINT [FK_WatchlistUser];
GO
IF OBJECT_ID(N'[dbo].[FK_WatchlistWatchListItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WatchListItems] DROP CONSTRAINT [FK_WatchlistWatchListItem];
GO
IF OBJECT_ID(N'[dbo].[FK_WatchListItemMovie]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WatchListItems] DROP CONSTRAINT [FK_WatchListItemMovie];
GO
IF OBJECT_ID(N'[dbo].[FK_UserFriends_User]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserFriends] DROP CONSTRAINT [FK_UserFriends_User];
GO
IF OBJECT_ID(N'[dbo].[FK_UserFriends_User1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserFriends] DROP CONSTRAINT [FK_UserFriends_User1];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Movies]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Movies];
GO
IF OBJECT_ID(N'[dbo].[Users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Users];
GO
IF OBJECT_ID(N'[dbo].[WatchListItems]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WatchListItems];
GO
IF OBJECT_ID(N'[dbo].[Watchlists]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Watchlists];
GO
IF OBJECT_ID(N'[dbo].[UserFriends]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserFriends];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Movies'
CREATE TABLE [dbo].[Movies] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Imdb] nvarchar(max)  NOT NULL,
    [Plot] nvarchar(max)  NOT NULL,
    [Duration] nvarchar(max)  NOT NULL,
    [PosterUrl] nvarchar(max)  NULL,
    [Title] nvarchar(max)  NOT NULL,
    [Year] nvarchar(max)  NOT NULL,
    [ReleaseDate] datetime  NULL,
    [MovieType] int  NOT NULL
);
GO

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Username] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'WatchListItems'
CREATE TABLE [dbo].[WatchListItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Watched] bit  NOT NULL,
    [InPosession] bit  NOT NULL,
    [WatchlistId] int  NOT NULL,
    [Movie_Id] int  NOT NULL
);
GO

-- Creating table 'Watchlists'
CREATE TABLE [dbo].[Watchlists] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [User_Id] int  NOT NULL
);
GO

-- Creating table 'UserFriends'
CREATE TABLE [dbo].[UserFriends] (
    [UserFriends_User1_Id] int  NOT NULL,
    [Friends_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Movies'
ALTER TABLE [dbo].[Movies]
ADD CONSTRAINT [PK_Movies]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WatchListItems'
ALTER TABLE [dbo].[WatchListItems]
ADD CONSTRAINT [PK_WatchListItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Watchlists'
ALTER TABLE [dbo].[Watchlists]
ADD CONSTRAINT [PK_Watchlists]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [UserFriends_User1_Id], [Friends_Id] in table 'UserFriends'
ALTER TABLE [dbo].[UserFriends]
ADD CONSTRAINT [PK_UserFriends]
    PRIMARY KEY CLUSTERED ([UserFriends_User1_Id], [Friends_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [User_Id] in table 'Watchlists'
ALTER TABLE [dbo].[Watchlists]
ADD CONSTRAINT [FK_WatchlistUser]
    FOREIGN KEY ([User_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WatchlistUser'
CREATE INDEX [IX_FK_WatchlistUser]
ON [dbo].[Watchlists]
    ([User_Id]);
GO

-- Creating foreign key on [WatchlistId] in table 'WatchListItems'
ALTER TABLE [dbo].[WatchListItems]
ADD CONSTRAINT [FK_WatchlistWatchListItem]
    FOREIGN KEY ([WatchlistId])
    REFERENCES [dbo].[Watchlists]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WatchlistWatchListItem'
CREATE INDEX [IX_FK_WatchlistWatchListItem]
ON [dbo].[WatchListItems]
    ([WatchlistId]);
GO

-- Creating foreign key on [Movie_Id] in table 'WatchListItems'
ALTER TABLE [dbo].[WatchListItems]
ADD CONSTRAINT [FK_WatchListItemMovie]
    FOREIGN KEY ([Movie_Id])
    REFERENCES [dbo].[Movies]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WatchListItemMovie'
CREATE INDEX [IX_FK_WatchListItemMovie]
ON [dbo].[WatchListItems]
    ([Movie_Id]);
GO

-- Creating foreign key on [UserFriends_User1_Id] in table 'UserFriends'
ALTER TABLE [dbo].[UserFriends]
ADD CONSTRAINT [FK_UserFriends_User]
    FOREIGN KEY ([UserFriends_User1_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Friends_Id] in table 'UserFriends'
ALTER TABLE [dbo].[UserFriends]
ADD CONSTRAINT [FK_UserFriends_User1]
    FOREIGN KEY ([Friends_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserFriends_User1'
CREATE INDEX [IX_FK_UserFriends_User1]
ON [dbo].[UserFriends]
    ([Friends_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------
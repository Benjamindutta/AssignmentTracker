package com.benjamin.assignmenttracker.dto;

public class RegisterDto {
    private String username;
    private String password;
    private boolean isAdmin;
    private boolean isCodereviewer;
    private String name;
    public RegisterDto(String username, String password, boolean isAdmin, boolean isCodereviewer) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isCodereviewer = isCodereviewer;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public boolean getIsCodereviewer() {
        return isCodereviewer;
    }

    public void setIsCodereviewer(boolean isCodereviewer) {
        this.isCodereviewer = isCodereviewer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "RegisterDto{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", isAdmin=" + isAdmin +
                ", isCodereviewer=" + isCodereviewer +
                '}';
    }
}

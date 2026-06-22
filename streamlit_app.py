import streamlit as st

st.set_page_config(page_title="E-Commerce Platform with Hybrid Recommendation System", layout="wide")

st.title("E-Commerce Platform with Hybrid Recommendation System")

# Sidebar for navigation
page = st.sidebar.selectbox("Navigate", ["Products", "Cart", "Wishlist", "Dashboard"])

# Mock data (you can call your Firebase API or REST API here)
products = [
    {"id": 1, "name": "Product A", "category": "Electronics", "price": 100},
    {"id": 2, "name": "Product B", "category": "Books", "price": 20},
    {"id": 3, "name": "Product C", "category": "Clothes", "price": 50},
]

# Simple user session state
if "cart" not in st.session_state:
    st.session_state.cart = []
if "wishlist" not in st.session_state:
    st.session_state.wishlist = []

# Pages
if page == "Products":
    st.subheader("Product List")
    for p in products:
        st.write(f"{p['name']} - ${p['price']} ({p['category']})")
        if st.button(f"Add {p['name']} to Cart"):
            st.session_state.cart.append(p)
        if st.button(f"Add {p['name']} to Wishlist"):
            st.session_state.wishlist.append(p)

elif page == "Cart":
    st.subheader("Cart")
    total = sum(item["price"] for item in st.session_state.cart)
    st.write(st.session_state.cart)
    st.write(f"Total: ${total}")
    if st.button("Checkout"):
        st.success(f"Order confirmed! Total: ${total}")
        st.session_state.cart.clear()

elif page == "Wishlist":
    st.subheader("Wishlist")
    st.write(st.session_state.wishlist)

elif page == "Dashboard":
    st.subheader("Admin Dashboard")
    categories = {}
    for item in st.session_state.cart:
        categories[item["category"]] = categories.get(item["category"], 0) + 1
    st.bar_chart(categories)
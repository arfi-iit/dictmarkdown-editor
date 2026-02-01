BUILD_DIR	= public
VERSION		= 1.0
NAME		= dictmarkdown-editor
RELEASE_DIR	= $(NAME)-$(VERSION)

clean:
	rm -rf $(NAME)-*;

# Crate a new release with an optional version number
# Example:
#     make release VERSION=1.2.3
release: clean
	mkdir -p $(RELEASE_DIR)/{esm,iife}/;
	npm run build;
	cp $(BUILD_DIR)/*.esm.* $(RELEASE_DIR)/esm/;
	cp $(BUILD_DIR)/*.iife.* $(RELEASE_DIR)/iife/;
	zip -r "$(RELEASE_DIR).zip" $(RELEASE_DIR);
	rm -rf $(RELEASE_DIR);
